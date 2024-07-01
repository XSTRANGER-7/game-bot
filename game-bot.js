const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],
    partials: ['CHANNEL']
});

require('dotenv').config();
const token = process.env.TOKEN;

client.once('ready', () => {
    console.log('Bot is online!');
});

const greetings = ['hi', 'hello', 'hey', 'hola', 'howdy', 'greetings', 'sup', 'hii', 'hlo', 'hiii', 'hloo'];
const games = new Map();
const userStats = new Map();

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const messageContent = message.content.toLowerCase();

    if (greetings.includes(messageContent)) {
        message.channel.send('Hello! 😃 Let\'s play Rock, Paper, Scissor!\n •Type `!rps` to start the game ✋📄✂️\n • Type `!exit` to exit the game\n • Type `!leaderboard` to show the leaderboard of the game');
    } else if (messageContent === '!rps') {
        if (games.has(message.author.id)) {
            message.channel.send('You already have an ongoing game! Finish it before starting a new one.');
        } else {
            if (!message.author.dmChannel) {
                await message.author.createDM();
            }
            message.author.send('Starting a new game of Rock, Paper, Scissor! Type `rock`, `paper`, or `scissor` to play. or Type `!exit` to stop the game.');
            message.channel.send(`${message.author.username} has started a game of Rock, Paper, Scissor in their DMs. Please check your direct messages!`);
            games.set(message.author.id, { userScore: 0, botScore: 0, rounds: 0, channel: message.channel, messages: [] });
        }
    } else if (messageContent === '!leaderboard') {
        displayLeaderboard(message.channel);
    } else if (message.guild === null && games.has(message.author.id)) {
        const game = games.get(message.author.id);
        if (messageContent === '!exit') {
            await endGame(message.author.dmChannel, message.author, 'You exited the game.');
        } else {
            const validChoices = ['rock', 'paper', 'scissor'];
            if (validChoices.includes(messageContent)) {
                await handleGameRound(message.author.dmChannel, message.author, messageContent);
            }
        }
    }
});

client.on('guildMemberAdd', member => {
    const welcomeMessage = `Welcome to the server, ${member.user.username}! 😃 Would you like to play Rock, Paper, Scissor?  \n Type \`!rps\` to start the game. \n Type \`!exit\` to exit the game. \n You can also check the leaderboard by typing \`!leaderboard\`.`;
    const systemChannel = member.guild.systemChannel;

    if (systemChannel) {
        systemChannel.send(welcomeMessage);
    } else {
        console.log('System channel not found or not set.');
    }
});

async function handleGameRound(dmChannel, user, userChoice) {
    const game = games.get(user.id);
    const choices = ['rock', 'paper', 'scissor'];
    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    let result = '';
    let userEmoji = '';
    let botEmoji = '';

    switch (userChoice) {
        case 'rock':
            userEmoji = '✊';
            break;
        case 'paper':
            userEmoji = '📄';
            break;
        case 'scissor':
            userEmoji = '✂️';
            break;
    }

    switch (botChoice) {
        case 'rock':
            botEmoji = '✊';
            break;
        case 'paper':
            botEmoji = '📄';
            break;
        case 'scissor':
            botEmoji = '✂️';
            break;
    }

    if (userChoice === botChoice) {
        result = 'It\'s a tie!';
    } else if (
        (userChoice === 'rock' && botChoice === 'scissor') ||
        (userChoice === 'paper' && botChoice === 'rock') ||
        (userChoice === 'scissor' && botChoice === 'paper')
    ) {
        result = 'You win this round!';
        game.userScore++;
    } else {
        result = 'You lose this round!';
        game.botScore++;
    }

    game.rounds++;
    const gameMessage = await dmChannel.send(`Round ${game.rounds}: You chose ${userChoice} ${userEmoji}, I chose ${botChoice} ${botEmoji}. ${result}`);
    game.messages.push(gameMessage);

    if (game.rounds >= 5) {
        let finalResult = '';
        if (game.userScore > game.botScore) {
            finalResult = 'Congratulations! You won the game! 🥳';
            updateStats(user.id, 'win');
        } else if (game.userScore < game.botScore) {
            finalResult = 'Sorry! You lost the game! 😢';
            updateStats(user.id, 'loss');
        } else {
            finalResult = 'The game is a tie! 🤝';
        }

        await dmChannel.send(`Final Score: You - ${game.userScore}, Bot - ${game.botScore}. ${finalResult}`);
        await dmChannel.send('Do you want to play again? Type `!rps` to start a new game.');

        const serverChannel = game.channel;
        await serverChannel.send(`Game Over! ${user.username}'s final score: You - ${game.userScore}, Bot - ${game.botScore}. ${finalResult}`);
        await serverChannel.send(`You can check the leaderboard by typing \`!leaderboard\`.`);

        games.delete(user.id);
    } else {
        const continueMessage = await dmChannel.send('Type `rock`, `paper`, or `scissor` to continue playing. or Type `!exit` to stop the game.');
        game.messages.push(continueMessage);
    }
}

async function endGame(dmChannel, user, reason) {
    const game = games.get(user.id);
    if (game) {
        for (const msg of game.messages) {
            await msg.delete().catch(err => console.error('Failed to delete message:', err));
        }
        await dmChannel.send(reason);

        const serverChannel = game.channel;
        await serverChannel.send(`${user.username} has exited the game.`);
        
        games.delete(user.id);
    }
}

function updateStats(userId, result) {
    if (!userStats.has(userId)) {
        userStats.set(userId, { wins: 0, losses: 0 });
    }

    const stats = userStats.get(userId);
    if (result === 'win') {
        stats.wins++;
    } else if (result === 'loss') {
        stats.losses++;
    }
}

function displayLeaderboard(channel) {
    if (userStats.size === 0) {
        channel.send('No games played yet!');
        return;
    }

    const sortedStats = Array.from(userStats.entries()).sort((a, b) => b[1].wins - a[1].wins);
    const topUser = sortedStats[0][0];
    const leaderboard = sortedStats.map(([userId, stats], index) => {
        const userTag = `<@${userId}>`;
        return `${index + 1}. ${userTag} - Wins: ${stats.wins}, Losses: ${stats.losses}${userId === topUser ? ' 🏆' : ''}`;
    }).join('\n');

    channel.send(`**Leaderboard:**\n${leaderboard}`);
}

client.login(token);
