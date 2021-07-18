const { Client, Message, MessageEmbed } = require("discord.js");
const message = require("discord.js");
const { create } = require("sourcebin");
module.exports = {
  name: "create-bin",
  description: "Make a bin from your javascript code!",
  usage: `rex create-bin <code>`,
  emoji: "📜",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const content = args.join(" ");
    if (!content)
      return message.channel.send({
        content:
          "<a:FHT_Cross:860848296154628096> please provide content to make a bin out of it!",
      });

    create(
      [
        {
          name: `Code by ${message.author.tag}`,
          content,
          language: "javascript",
        },
      ],
      {
        title: "Code",
      }
    ).then((value) => {
      message.channel.send(
        `<a:FHT_Correct:860848302227718184> I have created  a bin for javascript: ${value.url}`
      );
    });
  },
};
