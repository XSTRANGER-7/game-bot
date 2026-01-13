# 🎮 Discord Rock, Paper, Scissors Bot

A fun and interactive Discord bot that allows users to play Rock, Paper, Scissors directly in their DMs. The bot tracks player statistics and maintains a competitive leaderboard.

## ✨ Features

- **Interactive Gameplay**: Play Rock, Paper, Scissors in private DMs
- **Multi-round Matches**: Each game consists of 5 rounds
- **Real-time Scoring**: Live score tracking during gameplay
- **Leaderboard System**: Competitive ranking based on wins and losses
- **Welcome Messages**: Automatically greets new server members
- **Friendly Responses**: Responds to various greetings
- **Clean UI**: Uses emojis for better visual experience

## 📋 Prerequisites

Before running this bot, ensure you have:

- [Node.js](https://nodejs.org/) (v16.9.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Discord Bot Token ([How to create a Discord bot](https://discord.com/developers/applications))
- Docker (optional, for containerized deployment)

## 🚀 Installation

### Standard Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/game-bot.git
   cd game-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   TOKEN=your_discord_bot_token_here
   ```

4. **Run the bot**
   ```bash
   npm start
   ```

### Docker Installation

1. **Build the Docker image**
   ```bash
   docker build -t discord-game-bot .
   ```

2. **Run the container**
   ```bash
   docker run -d --name game-bot -e TOKEN=your_discord_bot_token_here discord-game-bot
   ```

## ⚙️ Configuration

### Discord Bot Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Navigate to the "Bot" section and create a bot
4. Copy the bot token and add it to your `.env` file
5. Enable the following Privileged Gateway Intents:
   - Server Members Intent
   - Message Content Intent
6. Generate an invite link with the following permissions:
   - Send Messages
   - Read Message History
   - View Channels
   - Send Messages in Threads

### Required Bot Permissions

- `GUILDS` - Access to guild information
- `GUILD_MEMBERS` - Welcome new members
- `GUILD_MESSAGES` - Read and respond to messages
- `MESSAGE_CONTENT` - Access message content
- `DIRECT_MESSAGES` - Play games in DMs

## 🎯 Usage

### Available Commands

| Command | Description |
|---------|-------------|
| `hi`, `hello`, `hey`, etc. | Get a greeting and instructions |
| `!rps` | Start a new Rock, Paper, Scissors game |
| `!exit` | Exit the current game |
| `!leaderboard` | Display the server leaderboard |
| `rock`, `paper`, `scissor` | Make your move (in DM during game) |

### How to Play

1. **Start a game**: Type `!rps` in any server channel
2. **Check your DMs**: The bot will send you a DM to play
3. **Make your choice**: Type `rock`, `paper`, or `scissor` in the DM
4. **Play 5 rounds**: The game automatically ends after 5 rounds
5. **Check results**: Final scores are posted in both DM and server channel
6. **View leaderboard**: Use `!leaderboard` to see top players

### Game Rules

- 🪨 Rock beats Scissors
- 📄 Paper beats Rock
- ✂️ Scissors beats Paper
- Each game consists of 5 rounds
- Winner is determined by best of 5

## 📊 Leaderboard

The bot tracks player statistics including:
- Total wins
- Total losses
- Ranking based on win count
- 🏆 Trophy indicator for the top player

## 🛠️ Technical Details

### Built With

- **[Discord.js](https://discord.js.org/)** v14.15.3 - Discord API wrapper
- **[dotenv](https://www.npmjs.com/package/dotenv)** v16.4.5 - Environment variable management
- **Node.js** - Runtime environment

### Project Structure

```
game-bot/
├── game-bot.js          # Main bot file with all game logic
├── package.json         # Project dependencies and scripts
├── package-lock.json    # Dependency lock file
├── Dockerfile           # Docker configuration
├── .env                 # Environment variables (create this)
└── README.md            # Project documentation
```

## 🐳 Docker Support

This bot includes Docker support for easy deployment.

**Environment Variables for Docker:**
- `TOKEN` - Your Discord bot token

**Docker Commands:**
```bash
# Build the image
docker build -t discord-game-bot .

# Run the container
docker run -d --name game-bot -e TOKEN=your_token discord-game-bot

# View logs
docker logs game-bot

# Stop the container
docker stop game-bot

# Remove the container
docker rm game-bot
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Troubleshooting

### Bot is not responding
- Verify your bot token is correct in the `.env` file
- Check if the bot has proper permissions in your server
- Ensure Message Content Intent is enabled in Discord Developer Portal

### DM games not working
- Check if users have DMs enabled from server members
- Verify the bot has permission to send direct messages

### Leaderboard not showing
- The leaderboard only appears after at least one complete game
- Stats are stored in memory and reset when the bot restarts

## 💡 Future Enhancements

Potential features for future versions:
- [ ] Persistent database for stats (MongoDB/PostgreSQL)
- [ ] Best of 3/5/7 game mode options
- [ ] Additional mini-games
- [ ] Custom emoji support
- [ ] Server-specific leaderboards
- [ ] Weekly/Monthly leaderboard resets
- [ ] Achievements system

## 📧 Support

If you encounter any issues or have questions, please:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the Discord.js documentation

---

Made with ❤️ using Discord.js | Rock 🪨 Paper 📄 Scissors ✂️

