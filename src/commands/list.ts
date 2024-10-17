/* eslint-disable camelcase */
import {Command, Flags} from '@oclif/core'
import {Octokit} from '@octokit/rest'

export default class List extends Command {
  static override description = 'List template versions from the repository'

  static override examples = ['<%= config.bin %> <%= command.id %>']
  static override flags = {
    token: Flags.string({char: 't', description: 'provide token for private repo'}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(List)
    await this.listVersions(flags.token)
  }

  private async listVersions(tokens?: string) {
    const templateRepo = 'Stradivary/angular-boilerplate'
    const [owner, repo] = templateRepo.split('/')

    const token = tokens || process.env.GITHUB_TOKEN

    if (!token) {
      this.log('No token provided. Proceeding unauthenticated.  you can add token by --token flags.')
    }

    const octokit = new Octokit(token ? {auth: token} : {})

    try {
      const response = await octokit.repos.listTags({
        owner,
        per_page: 100,
        repo,
      })

      const tags = response.data

      if (tags.length === 0) {
        this.log('ℹ  No tags found in the repository.')
        return
      }

      const versions = tags.map((tag) => tag.name)

      this.log('ℹ  Available versions:')
      this.log(versions.join('\n'))
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.error(`Repository not found: ${templateRepo}`)
      }
    }
  }
}
