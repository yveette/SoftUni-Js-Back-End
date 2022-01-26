// const env = process.env.NODE_ENV || 'development';
// const config = require('./config/config')[env];

const express = require('express');
const hbs = require('express-handlebars');

const { home } = require('./controllers/home');

const app = express();

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.get('/', home);

app.listen(3000, () => console.log('Server started on port 3000'));