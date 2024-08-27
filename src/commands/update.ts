import { Command } from '@oclif/core';

export default class Update extends Command {
  static override args = {
  };

  static override description = 'update codebase into specified minor version';

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ];

  static override flags = {
  };

  public async run(): Promise<void> {

    this.log('ℹ️ this command is not implemented yet');

  }
}
