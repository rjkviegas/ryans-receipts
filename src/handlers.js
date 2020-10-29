const { htmlReceipt } = require('./receipt');
const menu = require('./json/menus/menu.json');
const sampleOrder = require('../spec/sampleOrders/discounted/itemAndTotalDiscOrder.json');

exports.home = (req, res) => res.render('home', { sampleHtmlReceipt: htmlReceipt(menu, sampleOrder, 100.00) });

exports.about = (req, res) => res.render('about');

exports.notFound = (req, res) => res.render('404');

exports.serverError = (err, req, res, next) => res.render('500');
