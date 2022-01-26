// const env = process.env.NODE_ENV || 'development';
// const config = require('./config/config')[env];

const express = require('express');
const hbs = require('express-handlebars');

const cubesService = require('./config/cubes');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');

const app = express();

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(cubesService());

app.get('/', home);
app.get('/about', about)
app.route('/create')
    .get(create.get)
    .post(create.post);

app.get('/details/:id', details);

app.listen(3000, () => console.log('Server started on port 3000'));