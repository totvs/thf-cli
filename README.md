# THF CLI

The THF CLI is a command-line interface tool that you use to initialize and develop Angular applications with THF already configured.
You can use the tool directly in a command shell.

## Installation

Make sure Node, NPM and GIT are installed.

Then, install the CLI globally:

```
$ npm install -g @totvs/thf-cli
```

## Getting Started

Start a new project using the THF CLI and add components dynamically in your project.

To run an application, follow the steps below:

```
thf new SampleProject
cd SampleProject
ng serve
```

![Getting Started](https://media.giphy.com/media/3FbGebspps6pxlIUFr/giphy.gif)

To check the commands list of THF CLI, invoke --help:

```
thf --help
```

## Commands

Command | Alias | Description
--- | --- | ---
*[add](#add)* | a | Add a module that has a dynamic component of your choice.
*[new](#new)* | n | Creates a new project based in a template.

```
thf add <newComponentName>
```

```
thf new <projectName>
```

### add

This command adds in your project a module that has a dynamic component of your choice with internal routes configured, simply adding in your main application path or another module to run.

> Must be in project root folder.

```
thf add <newComponentName>
```

![Add Command](https://media.giphy.com/media/ksb6TvzeH4dcDSRMi8/giphy.gif)

If the project was built through the "sidemenu" template, you need to configure the new module by adding it in the route and in the menu list of the project.

> app.component.ts
```
readonly menus: Array<ThfMenuItem> = [
  { label: 'Home', link: '/home' },
  { label: 'Users', link: '/users' },
  // add here
  { label: 'newComponent', link: '/newComponent' },
];
```

> app-routing.component.ts
```
const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
  // add here
  { path: 'newComponent', loadChildren: './newComponent/newComponent.module#NewComponentModule' },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];
```

> If is a common Angular project, it's necessary import the new module in app module or adding it in lazy load route.

### new

This command initialize a project to you start your development more quickly with the THF already set up ready to run!

```
thf new <projectName> --template <template> --title <title>
```

![New Command](https://media.giphy.com/media/2A3FtMzAVfGQArw5i5/giphy.gif)

#### -t / --template

All templates have the THF configured, the templates that you can start are:

Template | Description
--- | ---
*blank* | Creates a simple project with THFModule and THF css configured.
*sidemenu* | Creates a project containing the menu and modules using lazy loading to start development.

> The default template is `sidemenu`.

```
thf new <projectName> --template <template>
```

#### --title

The informed value in this option will be used by the `thf-toolbar` title, if you don't use this option, the project name will be used.

```
thf new <projectName> --title <title>
```

### Add Git remote repository

To add a remote repository to your new project, run in folder project the command:

```
git remote add origin <path>
```

## License

MIT