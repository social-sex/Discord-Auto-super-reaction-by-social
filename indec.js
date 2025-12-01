const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

client.on('ready', () => {
    console.log(`${client.user.username} is ready to rape!`);
});

const superReactMap = new Map();

client.on('messageCreate', async (message) => {
    try {
        const content = message.content.trim();

        // -----------------------
        // Enable super react
        // -----------------------
        if (content.startsWith(',superreact')) {
            const args = content.split(' ').slice(1);

            const userMention = args[0];
            const emojis = args.slice(1);

            if (!userMention || emojis.length === 0)
                return message.reply('```Usage: ,superreact <@user> <emoji emoji2 more>```');

            // Extract user ID from mention
            const userId = userMention.replace(/\D/g, '');

            if (!userId)
                return message.reply('Invalid user mention.');

            superReactMap.set(userId, emojis);
            return message.reply(`Enabled auto-burst-react for <@${userId}> using ${emojis.join(', ')}`);
        }

        // -----------------------
        // Disable all
        // -----------------------
        if (content === ',endsuperreact') {
            superReactMap.delete(message.author.id);
            return message.reply('Super react disabled.');
        }

        // -----------------------
        // super react to messages
        // -----------------------
        if (superReactMap.has(message.author.id)) {
            const emojis = superReactMap.get(message.author.id);
            const emoji = emojis.shift(); // Get the first emoji
            await message.react(emoji, { burst: true });
            emojis.push(emoji); // Push it back to the end of the array
        }

    } catch (error) {
        console.error('Error:', error);
    }
});

client.login('TOKEN-HERE');
