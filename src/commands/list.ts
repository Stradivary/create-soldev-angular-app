/* eslint-disable camelcase */
import { Command } from '@oclif/core';
import { Octokit } from '@octokit/rest';

export default class List extends Command {
  static override description = 'List template versions from the repository';

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  public async run(): Promise<void> {
    await this.listVersions();
  }

  private async listVersions() {
    const templateRepo = 'Stradivary/angular-boilerplate';
    const [owner, repo] = templateRepo.split('/');

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      this.log(
        '⚠️  GITHUB_TOKEN environment variable not set. Proceeding unauthenticated. Rate limits may apply.'
      );
    }

    const octokit = new Octokit(token ? { auth: token } : {});

    try {
      const response = await octokit.repos.listTags({
        owner,
        per_page: 100,
        repo,
      });

      const tags = response.data;

      if (tags.length === 0) {
        this.log('ℹ️  No tags found in the repository.');
        return;
      }

      const versions = tags.map((tag) => tag.name);

      this.log('ℹ️  Available versions:');
      this.log(versions.join('\n'));
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.error(`Repository not found: ${templateRepo}`);
      }
    }
  }
}
