const client = require("../index");
const config = require("../config.json");
const chalk = require("chalk");

client.on("ready", () => {
  console.log(
    chalk.bgWhite.red(`✅ Successfully logged on as ${client.user.username}`)
  );
  client.user.setActivity(`${config.prefix}help | v3.0`);
});
