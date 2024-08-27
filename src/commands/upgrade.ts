import { Command } from '@oclif/core';

export default class Upgrade extends Command {
  static override args = { 
  }

  static override description = 'upgrade codebase into specified major version'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = { 
  }

  public async run(): Promise<void> { 

    this.log('ℹ️ this command is not implemented yet')

  }
}
