const { MessageEmbed, Message, Client } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;
let color = "#303136";
const { button_pagination } = require("djs-helper-v13");

module.exports = {
  name: "helpbtn",
  usage: "zak helpbtn",
  emoji: "🆘",
  description: "Shows all available bot commands, In button form.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String} args
   * @returns
   */
  run: async (client, message, args) => {
    let cots = [];
    let catts = [];

    if (!args[0]) {
      //categories to ignore
      let ignored = ["birthday", "owner"];

      const emo = {
        fun: "🎆",
        image: "🖼️",
        info: "❓",
        moderation: "⚒️",
        utility: "⚙️",
        tutorial: "📚",
      };

      readdirSync("./commands/").forEach((dir) => {
        if (ignored.includes(dir.toLowerCase())) return;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          let des = client.commands.get(name).description;
          let emoe = client.commands.get(name).emoji;
          let emoej = emoe ? emoe : "";

          let obj = {
            cname: `${emoej} \`${name}\``,
            des,
          };

          let oby = {
            dir: `${emo[dir.toLowerCase()]}  ${dir}`,
            obj,
          };

          return cots.push(oby);
        });
      });

      let embeds = [];

      cots.forEach((cot) => {
        cot.dir = cot.dir.replace(emo[cot.dir], "");

        embeds.push(
          new MessageEmbed()
            .setTitle(
              `${cot.dir.charAt(0).toUpperCase() + cot.dir.slice(1)} Commands!`
            )
            .setDescription(
              `Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`
            )
            .addFields({
              name: cot.obj.cname ? cot.obj.cname : "No Name",
              value: cot.obj.des ? cot.obj.des : "No description",
              inline: true,
            })
            .setColor(color)
        );
      });

      await button_pagination(client, message, embeds);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(
            `Invalid command! Use \`${prefix}help\` for all of my commands!`
          )
          .setColor("RED");
        return await client.sendEmbed(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField(
          "Command:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        // .addField(
        //   "Aliases:",
        //   command.aliases
        //     ? `\`${command.aliases.join("` `")}\``
        //     : "No aliases for this command."
        // )
        .addField(
          "Usage:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Command Description:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true,
          })
        )
        .setTimestamp()
        .setColor(color);
      return await client.sendEmbed(embed);
    }
  },
};
