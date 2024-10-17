import { confirm, input } from '@inquirer/prompts';
import { Args, Command, Flags } from '@oclif/core';
import { execa } from 'execa';
import { createSpinner } from 'nanospinner';
import { readdirSync } from 'node:fs';
import { access, constants } from 'node:fs/promises';
import path from 'node:path';

const templateRepo = 'Stradivary/angular-boilerplate';
const mainBranchName = 'main';

export default class Init extends Command {
  static override args = {
    name: Args.string({ description: 'Name of the project', required: false }),
    path: Args.string({ default: '.', description: 'Directory folder to create the project in', required: false }),
  };

  static override description = 'Initialize a new project';

  static override examples = ['<%= config.bin %> <%= command.id %> my-project'];

  static override flags = {
    force: Flags.boolean({ char: 'f', description: 'Force overwrite if directory is not empty' }),
    interactive: Flags.boolean({ char: 'i', description: 'Interactive mode' }),
    npm: Flags.boolean({ char: 'p', description: 'Install dependencies automatically' }),
    version: Flags.string({ char: 'v', description: 'Set version of the template; defaults to latest' }),
  };

  private npmConfirmed = false;

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Init);

    const name = args.name || await input({
      message: 'Enter the project name',
    });

    const targetDir = path.join(args.path, name);
    this.log(`> Creating new project in ${targetDir}`);

    await this.ensureDirectoryIsEmpty(targetDir, flags);
    await this.cloneTemplate(targetDir, flags);
    await this.postProcess(targetDir, flags);
    await this.logFinishMessage(targetDir);
  }

  private async ensureDirectoryIsEmpty(targetDir: string, flags: Record<string, any>) {
    try {
      // Check if the directory exists
      await access(targetDir, constants.F_OK);
      const files = readdirSync(targetDir);

      if (files.length > 0) {
        // Handle interactive mode
        if (flags.interactive && !flags.force) {
          const confirmOverwrite = await confirm({
            message: `The directory ${targetDir} is not empty. Do you want to overwrite its contents?`,
            default: false,
          });

          if (!confirmOverwrite) {
            this.log('> Operation cancelled by the user.');
            this.exit(0);
          }

          this.log(`> Overwriting the contents of ${targetDir}`);
        } else if (!flags.force) {
          this.error(`❌ The directory ${targetDir} is not empty. Use --force to overwrite.`);
        } else {
          this.log(`> Overwriting the contents of ${targetDir}`);
        }
      }
    } catch (error) {
      if (instanceOfNodeError(error, Error)) {
        // If the directory doesn't exist, do nothing
        if (error.code !== 'ENOENT') {
          this.error(`❌ Error accessing directory ${targetDir}: ${error.message}`);
        }
      }
    }
  }

  private async cloneTemplate(targetDir: string, flags: { force?: boolean; version?: string }) {
    this.log('> Initializing template -> ' + (flags.version ?? 'latest version'));
    const spinner = createSpinner();
    spinner.start();

    try {
      await execa('npx', [
        'tiged',
        `${templateRepo}#${flags.version ?? mainBranchName}`,
        targetDir,
        flags.force ? '--force' : '',
      ], {
        stderr: 'inherit',
        stdout: 'inherit',
      });

      spinner.success({
        mark: '✔️',
        text: 'Template initialized',
      });
    } catch (error) {
      if (error instanceof Error) {
        spinner.error({ text: `❌ Failed to initialize template: ${error.message}` });
        this.exit(1);
      }
    }
  }

  private async postProcess(targetDir: string, flags: { npm?: boolean; interactive: boolean }) {
    const shouldInstallNpm = flags.npm || (flags.interactive && await confirm({
      message: 'Do you want to install dependencies?',
      default: false,
    }));

    if (shouldInstallNpm) {
      this.log('> Installing dependencies');
      const spinner = createSpinner();
      spinner.start();

      try {
        await execa('npm', ['install'], { cwd: targetDir });
        spinner.success({ text: '> Dependencies installed' });
        this.npmConfirmed = true;
      } catch (error) {
        if (error instanceof Error) {
          spinner.error({ text: `❌ Failed to install dependencies: ${error.message}` });
          this.exit(1);
        }
      }
    }
  }

  private async logFinishMessage(targetDir: string) {
    this.log('\n\n🎉 Congratulations! You are ready to develop.');
    this.log('\n👉 To get started:');
    this.log(`      cd ${targetDir}`);
    if (!this.npmConfirmed) {
      this.log('      npm install');
    }
    this.log('      npm run dev');
    this.log('\n🚀 Happy coding!');
  }
}


export function instanceOfNodeError<T extends new (...args: any) => Error>(
  value: unknown,
  errorType: T
): value is InstanceType<T> & NodeJS.ErrnoException {
  return value instanceof errorType;
}