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
create-soldev-angular-app/0.1.16 win32-x64 node-v20.16.0
$ create-soldev-angular-app --help [COMMAND]
USAGE
  $ create-soldev-angular-app COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g create-soldev-angular-app
$ create-soldev-angular-app COMMAND
running command...
$ create-soldev-angular-app (--version)
create-soldev-angular-app/0.1.14 linux-x64 node-v20.17.0
$ create-soldev-angular-app --help [COMMAND]
USAGE
  $ create-soldev-angular-app COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`create-soldev-angular-app help [COMMAND]`](#create-soldev-angular-app-help-command)
* [`create-soldev-angular-app init [NAME] [PATH]`](#create-soldev-angular-app-init-name-path)
* [`create-soldev-angular-app list`](#create-soldev-angular-app-list)
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

## `create-soldev-angular-app init [NAME] [PATH]`

initialize a new project

```
USAGE
  $ create-soldev-angular-app init [NAME] [PATH] [-f] [-i] [-p] [-v <value>]

ARGUMENTS
  NAME  Name of the project
  PATH  [default: .] directory folder to create the project in

FLAGS
  -f, --force
  -i, --interactive      interactive mode
  -p, --npm              Install dependencies
  -v, --version=<value>  Set version of the template, default to latest

DESCRIPTION
  initialize a new project

EXAMPLES
  $ create-soldev-angular-app init my-project
```

_See code: [src/commands/init.ts](https://github.com/Stradivary/create-soldev-angular-app/blob/v0.1.16/src/commands/init.ts)_

## `create-soldev-angular-app list`

List template versions from the repository

```
USAGE
  $ create-soldev-angular-app list [-t <value>]

FLAGS
  -t, --token=<value>  provide token for private repo

DESCRIPTION
  List template versions from the repository

EXAMPLES
  $ create-soldev-angular-app list
```

_See code: [src/commands/list.ts](https://github.com/Stradivary/create-soldev-angular-app/blob/v0.1.16/src/commands/list.ts)_

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

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/v2.2.12/src/commands/version.ts)_
<!-- commandsstop -->
* [`create-soldev-angular-app help [COMMAND]`](#create-soldev-angular-app-help-command)
* [`create-soldev-angular-app init [NAME] [PATH]`](#create-soldev-angular-app-init-name-path)
* [`create-soldev-angular-app list`](#create-soldev-angular-app-list)
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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.8/src/commands/help.ts)_

## `create-soldev-angular-app init [NAME] [PATH]`

initialize a new project

```
USAGE
  $ create-soldev-angular-app init [NAME] [PATH] [-f] [-i] [-p] [-v <value>]

ARGUMENTS
  NAME  Name of the project
  PATH  [default: .] directory folder to create the project in

FLAGS
  -f, --force
  -i, --interactive      interactive mode
  -p, --npm              Install dependencies
  -v, --version=<value>  Set version of the template, default to latest

DESCRIPTION
  initialize a new project

EXAMPLES
  $ create-soldev-angular-app init my-project
```

_See code: [src/commands/init.ts](https://github.com/Stradivary/create-soldev-angular-app/blob/v0.1.14/src/commands/init.ts)_

## `create-soldev-angular-app list`

List template versions from the repository

```
USAGE
  $ create-soldev-angular-app list

DESCRIPTION
  List template versions from the repository

EXAMPLES
  $ create-soldev-angular-app list
```

_See code: [src/commands/list.ts](https://github.com/Stradivary/create-soldev-angular-app/blob/v0.1.14/src/commands/list.ts)_

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

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/v2.2.10/src/commands/version.ts)_
<!-- commandsstop -->
