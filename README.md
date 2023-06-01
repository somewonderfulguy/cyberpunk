Please, see architecture of project in `architecture.dio` file. You can open it right in VS Code if you have [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) plugin installed.

Project roadmap:\
1. `packages/library` to work using Rollup, Storybook, Jest & import Federated Module
1. HOCs (`withLazyLoad` and `withLazyHooks`) to be an npm package
1. `packages/host` to work using Vite & Vitest
1. a project to be set up using Webpack + Module Federation
1. Possible options to learn & practice: Parcel, Lerna, single-spa, Astro

## Launch application

Before first start, perform following commands:
```
yarn
yarn initialize
```
And now, whenever you develop just do this:
```
yarn start
```

## Edit shared components
Assuming you are working with some library component and see changes in Storybook but you want your changes to be in other projects (host and sub-application). Then yo need to perform this:
```
cd ./packages/library
yarn build:rollup
```
Do the same thing when you edit sub-appication code and want to see your changes in host application:
```
cd ./packages/sub-application
yarn build:rollup
```

## Build & serve
This is quite straightforward process:
```
yarn build
yarn serve
```
Now you can open http://localhost:5003 and ensure that all the components from separate project have been successfuly built into single application that is named as `host` in the file directory.

## Library tests
Go to `library` project (`cd ./packages/library`). Here you can run tests. The project completely covered with tests as library elements expected to be reusable and very stable.
Following command runs tests in watch mode:
```
yarn test
```
For test coverage run:
```
yarn test:coverage
```
And then you can open `library/coverage/lcov-report/index.html` in your browser to see test coverage report.
