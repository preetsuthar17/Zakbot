const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  description: "Get bot's rel time ping status",
  usage: "zak ping",
  emoji: "🏓",

  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor("#303136")
      .setTitle("🏓 Ping pong!")
      .setDescription(`PING: ${client.ws.ping}`);

    message.channel.send({ embeds: [embed] });
  },
};
