const express = require('express');
const expressHandlebars = require('express-handlebars');
const { htmlReceipt } = require('./src/receipt');
const menu = require('./src/json/menus/menu.json');
const sampleOrder = require('./spec/sampleOrders/discounted/itemAndTotalDiscOrder.json');

const app = express();

app.use(express.static(__dirname + '/public'));

//configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.render('home', { sampleHtmlReceipt: htmlReceipt(menu, sampleOrder, 100.00) }));

app.get('/about', (req, res) => res.render('about'));

// custom 404 page
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
});

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    'press Ctrl-C to terminate.'
));