const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
     intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

require('dotenv').config();
const token = process.env.TOKEN; 

client.once('ready', () => {
    console.log('Bot is online!');
});

const greetings = ['hi', 'hello', 'hey', 'hola', 'howdy', 'greetings', 'sup', 'hii', 'hlo', 'hiii', 'hloo'];

client.on('messageCreate', message => {
    if (message.author.bot) return;

    const messageContent = message.content.toLowerCase();

    if (greetings.includes(messageContent)) {
        message.channel.send('Hello! 😃 Let\'s play Rock, Paper, Scissors! Type `!rps` to start the game.  ✋📄✂️');
    } else if (messageContent === '!rps') {
        playGame(message);
    }
});

async function playGame(message) {
    let userScore = 0;
    let botScore = 0;

    for (let i = 0; i < 5; i++) {
        await message.channel.send(`Round ${i + 1}! Type \`rock\`, \`paper\`, or \`scissors\` to play.`);

        const filter = response => {
            return ['rock', 'paper', 'scissors'].includes(response.content.toLowerCase()) && response.author.id === message.author.id;
        };

        try {
            const collected = await message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] });
            const userChoice = collected.first().content.toLowerCase();
            const choices = ['rock', 'paper', 'scissors'];
            const botChoice = choices[Math.floor(Math.random() * choices.length)];

            let result = '';
            if (userChoice === botChoice) {
                result = 'It\'s a tie!';
            } else if (
                (userChoice === 'rock' && botChoice === 'scissors') ||
                (userChoice === 'paper' && botChoice === 'rock') ||
                (userChoice === 'scissors' && botChoice === 'paper')
            ) {
                result = 'You win this round!';
                userScore++;
            } else {
                result = 'You lose this round!';
                botScore++;
            }

            await message.channel.send(`You chose ${userChoice}, I chose ${botChoice}. ${result}`);
        } catch (err) {
            await message.channel.send('You didn\'t respond in time! You lose this round!');
            botScore++;
        }
    }

    let finalResult = '';
    if (userScore > botScore) {
        finalResult = 'Congratulations! You won the game! 🥳';
    } else if (userScore < botScore) {
        finalResult = 'Sorry! You lost the game! 😢';
    } else {
        finalResult = 'The game is a tie! 🤝';
    }

    await message.channel.send(`Final Score: You - ${userScore}, Bot - ${botScore}. ${finalResult}`);
    await message.channel.send('Do you want to play again? Type `!rps` to start a new game.');
}

client.login(token);


 