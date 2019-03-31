# Neko.fun - Free and opensource url shortener

Neko.fun is an easy to use, open source and completely free url shotener service. We accept all links, and give you back a shareable link for you to send to others.

## Getting Started

### Prerequisites

- Node.JS
- Database (MySQL)

### Installing

- Clone this repo
- Rename `config.exemple.js` by `config.js`
- Modify the config file as you want
- Import `dump.sql` to your database
- run `npm i` in the project folder to install all dependencies

## Running

- run `pm2 start main.js` or `node main.js`

## Built With

* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [Knex](https://knexjs.org) - A SQL query builder that is flexible, portable, and fun to use!
* [Nunjucks](https://mozilla.github.io/nunjucks/) - Full featured templating engine for javascript.

## Authors

* **Sylvain L.** - *Initial work* - [OnDebian](https://github.com/OnDebian)

## License

This project is licensed under the GPL v3.0 License - see the [LICENSE.md](LICENSE.md) file for details