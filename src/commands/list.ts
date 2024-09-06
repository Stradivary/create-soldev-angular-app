import { Command } from '@oclif/core';

export default class List extends Command {

  static override description = 'list template versions from repository';

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ];

  public async run(): Promise<void> {

    await this.listVersions();


  }

  private async listVersions() {
    const versions = [
      '0.1.0',
    ];
    this.log('listing template versions from repository [alpha]')
    versions.forEach(x => this.log(x))
  }

}
