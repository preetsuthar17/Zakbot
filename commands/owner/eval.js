const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  name: "eval",
  description: "Evaluate code",
  usage: "zak eval <code>",
  emoji: "💻",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "741549223127941170") return;
    let code = args.join(" ");
    if (!code) {
      return message.channel.send({
        content: "Please give a code to evaluate you dumb coder",
      });
    }
    let e;
    try {
      e = eval(process);
    } catch (err) {
      e = err;
    }
    const embed = new MessageEmbed()
      .setTitle("Evaluated Code")
      .setColor("#303136")
      .addField("Input", "```js\n" + code + "\n```")
      .addField("Output", "```js\n" + e + "\n```");
    message.channel.send({ embeds: [embed] });
  },
};
