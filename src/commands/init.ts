import { input } from '@inquirer/prompts';
import { Args, Command, Flags } from '@oclif/core';
import { execa } from 'execa';
import { createSpinner } from 'nanospinner';
import { mkdirSync, readdirSync } from 'node:fs';
import { access, constants } from 'node:fs/promises';
import path from 'node:path';



const templateRepo = 'Stradivary/angular-boilerplate';
const mainBranchName = 'main';

export default class Init extends Command {

  static override args = {
    directory: Args.string({ default: '.', description: 'directory to create the project in' }),
  };

  static override description = 'initialize a new project';

  static override examples = [
    '<%= config.bin %> <%= command.id %> my-project',
  ];

  static override flags = {
    force: Flags.boolean({ char: 'f' }),
    intractive: Flags.boolean({ char: 'i', description: "interactive mode" }),
    git: Flags.boolean({ char: 'g', description: 'Initialize a git repository' }),
    npm: Flags.boolean({ char: 'p', description: 'Install dependencies' }),
    name: Flags.string({ char: 'n', description: 'Project Name' }),
    version: Flags.string({ char: 'v', description: 'Version of the template' }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Init);

    const name = flags.name ?? await input({
      message: 'Enter the project name',
    });

    const targetDir = path.join(args.directory, name);

    this.log(`ℹ️ creating new project in ${targetDir}`);

    await this.checkIfDirectoryNotEmpty(targetDir, flags);

    await this.checkVersion(flags.version);

    await this.cloneTemplate(targetDir, flags);

    await this.postProcess(targetDir, flags);

    await this.logFinishMessage(targetDir);
  }


  private async checkIfDirectoryNotEmpty(targetDir: string, flags: Record<string, any>) {
    try {
      // Check if the directory exists
      await access(targetDir, constants.F_OK);

      // If it exists, check if it's empty
      const files = readdirSync(targetDir);
      if (files.length > 0 && !flags.force) {
        this.log(`ℹ️ The directory ${targetDir} is not empty. Please use --force to overwrite the contents.`);
        this.exit(1);
      }

      if (flags.force) {
        this.log(`ℹ️ Overwriting the contents of ${targetDir}`);
      }
    } catch (error) {
      // If the directory doesn't exist, create it
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        try {
          mkdirSync(targetDir, { recursive: true });
          this.log(`ℹ️ Created directory ${targetDir}`);
        } catch (mkdirError) {
          this.error(`❌ Failed to create directory ${targetDir}: ${mkdirError}`);
        }
      } else {
        // If there's any other error, report it
        this.error(`❌ Error accessing directory ${targetDir}: ${error}`);
      }
    }
  }

  private async checkVersion(version?: string) {
    if (version) {
      this.log(`ℹ️ Using version ${version}`);
      return;
    }

    this.log('ℹ️ No version specified. Using latest version');
  }

  private async cloneTemplate(targetDir: string, flags: { force?: boolean; version?: string; }) {
    this.log('ℹ️ Initializing template -> ' + (flags.version ?? 'latest version'));
    const spinner = createSpinner();
    spinner.start();

    await execa('npx', ['tiged', `${templateRepo}#${flags.version ?? mainBranchName}`, targetDir, flags.force ? '--force' : ''], {
      stderr: 'inherit', stdout: 'inherit'
    });

    spinner.success({
      mark: '✔️',
      text: 'Template initialized',
    });
  }

  private async logFinishMessage(targetDir: string) {
    this.log(`\n\n🎉 Congatulations, You're ready to develop`);
    this.log('\n👉 To get started:');
    this.log(`      cd ${targetDir}`);
    this.log('      npm run dev');
    this.log('\n🚀 Happy coding!');
  }

  private async postProcess(targetDir: string, flags: { git?: boolean; install?: boolean; }) {
    if (flags.git) {
      this.log('ℹ️ Initializing git repository');
      const spinner = createSpinner();
      spinner.start();
      await execa('git', ['init'], { cwd: targetDir });
      spinner.stop();
      this.log('Git repository initialized');
    }

    if (flags.install) {
      this.log('ℹ️ Installing dependencies');
      const spinner = createSpinner();
      spinner.start();
      await execa('npm', ['install'], { cwd: targetDir });
      spinner.stop();
      this.log('ℹ️ Dependencies installed');
    }

  }

}


