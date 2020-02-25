const Command = require('../Command.js');
const { oneLine } = require('common-tags');

module.exports = class SetPrefixCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setprefix',
      usage: '<PREFIX>',
      description: 'Sets the prefix for your server (max length of 3 characters).',
      type: 'admin',
      userPermissions: ['MANAGE_GUILD']
    });
  }
  run(message, args) {
    // Check permissions
    const permission = this.checkPermissions(message);
    if (permission !== true) return message.channel.send(permission);
    const prefix = args[0];
    if (!prefix || prefix.length > 3) return message.channel.send(oneLine`
      Sorry ${message.member}, I don't recognize that. Please ensure that the prefix is no larger than 3 characters.
    `);
    message.client.db.guildSettings.updatePrefix.run(prefix, message.guild.id);
    message.channel.send(`Successfully updated the prefix to \`${prefix}\`.`);
  }
};