# 20-Day Ionic Development Intern Training Plan

## Day-1
initial setup is done, versions of dependencies used:
- Node.js v26.12.1
- npm 12.2.1
- TypeScript ~6.0.0
- Angular 22.2.3
- Ionic ^9.0.0

> have to finalize versions of Node.js LTS, Ionic CLI, Angular, Capacitor, Android Studio/SDK, Java/JDK and Gradle

### Running setup for development
1. git clone the repository and move into project directory
```bash
$ git clone https://github.com/NegativeZ3r0/PugArch-Internship-Tasks.git
$ cd internship-tasks
```

2. install project dependecies
```bash
$ npm ci && cd myApp && npm ci
```

3. start development server
```bash
$ npx ionic serve
```
## Day-2
Created a home screen with a list of packages and version chips.

## Day-3
Created ToDo list
- mock tasks data provided by an anguler service from `services/tasks`
- added list filter component using `ion-segment`
- type model defined in task-item component in `components/task-item`

## Day-4
Created list, detail, and settings pages with navigation.
- added task details page (`pages/task-details`)
- added settings page with dark mode toggle (`pages/settings`)
