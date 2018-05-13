# vue-blog-ui
[![Build Status](https://img.shields.io/travis/lexmartinez/vue-blog-ui/master.svg?style=for-the-badge)](https://travis-ci.org/lexmartinez/vue-blog-ui)
[![GitHub license](https://img.shields.io/github/license/lexmartinez/vue-blog-ui.svg?style=for-the-badge)](https://github.com/lexmartinez/vue-blog-ui/blob/master/LICENSE.md)
[![Last version](https://img.shields.io/badge/version-v1.0.0-blue.svg?style=for-the-badge)](https://github.com/lexmartinez/vue-blog-ui/blob/master/CHANGELOG.md)
<br/><br/>
:boat: A blogging client UI built on VueJS <br/>

Simple and powerful blogging site, created as VueJS study case with with purpose to be my blog using [hapi-blog](https://github.com/lexmartinez/hapi-blog) as core engine.


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

 ## Deployment
  
This app is ready to be deployed to github pages through TravisCI (using the .travis.yml file) you just need to create the github repo and setup the github key on travisCI

#### Apache Deploy

Since if you enter a URL directly the router will throw us a 404 error, we must add the following snippet to our `.htaccess` file if we are deploying in apache server, if you can not check the [vue docs](https://router.vuejs.org/en/essentials/history-mode.html) in order to see other setup / server options 

```
<ifModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /post.php [L]
</ifModule>
```

> Note that we are redirecting the requests to `post.php` in order to use our metatags script/plugin but if you don't want use it or your server isn't PHP compatible you can replace that line (7) by `RewriteRule . /index.html [L]`

## License

This project is licensed under MIT License - see the [LICENSE.md](https://github.com/lexmartinez/vue-blog-ui/blob/master/LICENSE.md) file for details

> Special thanks to this (SnipCart article)[https://snipcart.com/blog/vuejs-blog-demo], was a big lighthouse for start this project and it's structure
