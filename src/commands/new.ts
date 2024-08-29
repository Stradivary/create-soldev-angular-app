import { Args, Command } from '@oclif/core';
import { execa } from 'execa';
import ora from 'ora';
import chalk from 'chalk';
import { mkdirSync, readdirSync } from 'node:fs';
import { access, constants } from 'node:fs/promises';
import path from 'node:path';

const templates = [
    {
        name: "angular",
        repository: "ssh://git@github.com:user/angular-template.git"
    },
    {
        name: "nextjs",
        repository: "ssh://git@github.com:user/nextjs-template.git"
    }
];


export default class CreateSoldevApp extends Command {
    static override args = {
        appName: Args.string({ description: 'Name of the app (npm package name format)' }),
        templateName: Args.string({ description: 'Name of the template to use' }),
    };

    static override description = 'Create a new Soldev app';

    static override examples = [
        '<%= config.bin %> <%= command.id %> my-app (angular|nextjs)',
    ];


    public async run(): Promise<void> {
        const { args } = await this.parse(CreateSoldevApp);
        const { appName = "", templateName = "" } = args || {};

        if (appName === "" && templateName === "") {
            this.error('Please provide an app name and a template name', {
                exit: 1
            });
        }

        if (!this.isValidPackageName(appName)) {
            this.error('Invalid app name. Please use a valid npm package name format.', {
                exit: 1
            })
        }

        const template = templates.find(t => t.name === templateName);
        if (!template) {
            this.error(`Template "${templateName}" not found. Available templates: ${templates.map(t => t.name).join(', ')}`, {
                exit: 1
            })
        }

        const targetDir = path.join(process.cwd(), appName);

        this.log(`Creating new project in ${targetDir}`);

        await this.checkIfDirectoryNotEmpty(targetDir);
        await this.cloneTemplate(targetDir, template.repository);
        await this.postProcess(targetDir);
        await this.logFinishMessage(targetDir);
    }

    private isValidPackageName(name: string): boolean {
        return /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(name);
    }

    private async checkIfDirectoryNotEmpty(targetDir: string) {
        try {
            await access(targetDir, constants.F_OK);
            const files = readdirSync(targetDir);
            if (files.length > 0) {
                this.error(`The directory ${targetDir} is not empty. Please choose a different name or empty the directory.`);
                this.exit(1);
            }
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                try {
                    mkdirSync(targetDir, { recursive: true });
                    this.log(`Created directory ${targetDir}`);
                } catch (mkdirError) {
                    this.error(`Failed to create directory ${targetDir}: ${mkdirError}`);
                    this.exit(1);
                }
            } else {
                this.error(`Error accessing directory ${targetDir}: ${error}`);
            }
        }
    }

    private async cloneTemplate(targetDir: string, repository: string) {
        this.log(`Initializing template from ${repository}`);
        const spinner = ora('Cloning template...').start();

        try {
            await execa('npx', ['tiged', repository, targetDir, '--git', '--force']);
            spinner.succeed('Template initialized');
        } catch (error) {
            spinner.fail('Failed to clone template');
            this.error(`Error cloning template: ${error}`, {
                exit: 1
            })
        }
    }

    private async postProcess(targetDir: string) {
        this.log('Running post-processing steps');

        const spinner = ora('Initializing git repository...').start();
        try {
            await execa('git', ['init'], { cwd: targetDir });
            spinner.succeed('Git repository initialized');
        } catch (error) {
            spinner.fail('Failed to initialize git repository');
            this.warn(`Git initialization failed: ${error}`);
        }

        spinner.text = 'Installing dependencies...';
        spinner.start();
        try {
            await execa('npm', ['install'], { cwd: targetDir });
            spinner.succeed('Dependencies installed');
        } catch (error) {
            spinner.fail('Failed to install dependencies');
            this.warn(`Dependency installation failed: ${error}`);
        }
    }

    private async logFinishMessage(targetDir: string) {
        this.log('\nCongratulations! Your Soldev app is ready.');
        this.log('\n👉 To get started:');
        this.log(chalk.cyan(`   cd ${targetDir}`));
        this.log(chalk.cyan('   npm run dev'));
        this.log(chalk.yellow('\n🚀 Happy coding!'));
    }
}