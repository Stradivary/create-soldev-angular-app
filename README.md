create-soldev-angular-app
=================

Codebase builder for telkomsel angular app


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/create-soldev-angular-app.svg)](https://npmjs.org/package/create-soldev-angular-app)
[![Downloads/week](https://img.shields.io/npm/dw/create-soldev-angular-app.svg)](https://npmjs.org/package/create-soldev-angular-app)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g create-soldev-angular-app
$ create-soldev-angular-app COMMAND
running command...
$ create-soldev-angular-app (--version)
create-soldev-angular-app/0.1.8 linux-x64 node-v20.16.0
$ create-soldev-angular-app --help [COMMAND]
USAGE
  $ create-soldev-angular-app COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`create-soldev-angular-app help [COMMAND]`](#create-soldev-angular-app-help-command)
* [`create-soldev-angular-app init [NAME] [DIRECTORY]`](#create-soldev-angular-app-init-name-directory)
* [`create-soldev-angular-app list`](#create-soldev-angular-app-list)
* [`create-soldev-angular-app update [CHANNEL]`](#create-soldev-angular-app-update-channel)
* [`create-soldev-angular-app version`](#create-soldev-angular-app-version)

## `create-soldev-angular-app help [COMMAND]`

Display help for create-soldev-angular-app.

```
USAGE
  $ create-soldev-angular-app help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for create-soldev-angular-app.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.10/src/commands/help.ts)_

## `create-soldev-angular-app init [NAME] [DIRECTORY]`

initialize a new project

```
USAGE
  $ create-soldev-angular-app init [NAME] [DIRECTORY] [-f] [-i] [-g] [-p] [-v <value>]

ARGUMENTS
  NAME       Name of the project
  DIRECTORY  [default: .] directory to create the project in

FLAGS
  -f, --force
  -g, --git              Initialize a git repository
  -i, --interactive      interactive mode
  -p, --npm              Install dependencies
  -v, --version=<value>  Version of the template

DESCRIPTION
  initialize a new project

EXAMPLES
  $ create-soldev-angular-app init my-project
```

_See code: [src/commands/init.ts](https://github.com/Stradivary/create-soldev-angular-app/blob/v0.1.8/src/commands/init.ts)_

## `create-soldev-angular-app list`

list template versions from repository

```
USAGE
  $ create-soldev-angular-app list

DESCRIPTION
  list template versions from repository

EXAMPLES
  $ create-soldev-angular-app list
```

_See code: [src/commands/list.ts](https://github.com/Stradivary/create-soldev-angular-app/blob/v0.1.8/src/commands/list.ts)_

## `create-soldev-angular-app update [CHANNEL]`

update the create-soldev-angular-app CLI

```
USAGE
  $ create-soldev-angular-app update [CHANNEL] [--force |  | [-a | -v <value> | -i]]

FLAGS
  -a, --available        See available versions.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
      --force            Force a re-download of the requested version.

DESCRIPTION
  update the create-soldev-angular-app CLI

EXAMPLES
  Update to the stable channel:

    $ create-soldev-angular-app update stable

  Update to a specific version:

    $ create-soldev-angular-app update --version 1.0.0

  Interactively select version:

    $ create-soldev-angular-app update --interactive

  See available versions:

    $ create-soldev-angular-app update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v4.5.5/src/commands/update.ts)_

## `create-soldev-angular-app version`

```
USAGE
  $ create-soldev-angular-app version [--json] [--verbose]

FLAGS
  --verbose  Show additional information about the CLI.

GLOBAL FLAGS
  --json  Format output as json.

FLAG DESCRIPTIONS
  --verbose  Show additional information about the CLI.

    Additionally shows the architecture, node version, operating system, and versions of plugins that the CLI is using.
```

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/v2.2.11/src/commands/version.ts)_
<!-- commandsstop -->
