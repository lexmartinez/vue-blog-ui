# vue-blog-ui
[![NodeJS version](https://img.shields.io/badge/node-v7.10.1-green.svg)](https://nodejs.org/es/)
[![NPM version](https://img.shields.io/badge/npm-v4.2.0-red.svg)](https://www.npmjs.com/)
[![VueJS version](https://img.shields.io/badge/VueJS-v2.9.1-green.svg)](https://vuejs.org/)
[![GitHub license](https://img.shields.io/github/license/lexmartinez/vue-blog-ui.svg)](https://github.com/lexmartinez/vue-blog-ui/blob/master/LICENSE.md)
[![Last version](https://img.shields.io/badge/vue--blog--ui-v1.0.0-lightgrey.svg)](https://github.com/lexmartinez/vue-blog-ui/blob/master/CHANGELOG.md)
<br/><br/>
:boat: A blogging client UI built on VueJS <br/>

Simple and powerful blogging site, created as VueJS study case with with purpose to be my website/blog using [hapi-blog](https://github.com/lexmartinez/hapi-blog) as core enine.


### Quick start

```bash
# clone repo
$ git clone https://github.com/lexmartinez/vue-blog-ui

# change directory to cloned app
$ cd vue-blog-ui

# install the dependencies with npm
$ npm install

# start the server
$ npm run dev
```
go to [http://localhost:8080](http://localhost:8080) in your browser.

# Table of Contents

* [Dependencies](#dependencies)
* [Developing](#developing)
* [Testing](#testing)
* [Production](#production)
* [License](#license)

## Dependencies
 
 What you need to run this app:
 * `node` and `npm` (Use [NVM](https://github.com/creationix/nvm))
 * Ensure you're running Node (`v7.x.x`+) and NPM (`4.x.x`+)
 
 ## Developing
 
 After you have installed all dependencies you can now start developing with:
 
 * `npm run dev`
 
 It will start a local server using `webpack` which will watch, build (in-memory), and reload for you. The application can be checked at `http://localhost:8080`.

 ## Testing
 
 `vue-blog-ui` has an [ESLint](https://eslint.org/) integration for consistent code inspection, you can run that tool with command:
 
 * `npm test`

## Production

In order to generate a dist bundle you can use the following commands:

``` bash
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## License

This project is licensed under MIT License - see the [LICENSE.md](https://github.com/lexmartinez/vue-blog-ui/blob/master/LICENSE.md) file for details
