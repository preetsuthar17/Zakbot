const config = require("./config.json");
const { Client, Collection } = require("discord.js");
const discord = require("discord.js");
const chalk = require("chalk");
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_EMOJIS",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGES",
  ],
});
const fs = require("fs");

module.exports = client;
client.commands = new discord.Collection();

// command handler

let folders = fs.readdirSync("./commands/");

folders.forEach((dir) => {
  const commandFiles = fs
    .readdirSync(`./commands/${dir}/`)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${dir}/${file}`);

    client.commands.set(command.name, command);

    console.log(chalk.green(`${command.name} Loaded Successfullly [COMMAND]`));
  }
});

// event handler

let eventFolder = fs.readdirSync("./events");

eventFolder.forEach((dir) => {
  const eventFiles = fs
    .readdirSync(`./events/`)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const Event = require(`./events/${file}`);
    const eventNames = file.split(".")[0];
    console.log(chalk.yellow(`${eventNames} Loaded Successfullly [EVENT]`));
  }
});

client.login(config.token);
