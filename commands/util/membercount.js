const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "member-count",
  description: "Gives you total numbers of members from server!",
  usage: `zak member-count`,
  emoji: "👬",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle(`${message.guild.name}`)
      .setColor("#303136")
      .setDescription(`Member Count: ${message.guild.memberCount}`);
    message.channel.send({ embeds: [embed] });
  },
};
