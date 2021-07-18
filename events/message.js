const client = require("../index");
const prefix = require("../config.json").prefix;

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix)) return;

  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const cmd = args.shift().toLowerCase();

  let command = client.commands.get(cmd);

  if (command) command.run(client, message, args);
});
