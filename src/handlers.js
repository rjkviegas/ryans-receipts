const { htmlReceipt } = require('./lib/receipt');
const menu = require('./json/menus/menu.json');
const sampleOrder = require('./json/sampleOrders/discounted/itemAndTotalDiscOrder.json');

exports.home = (req, res) => res.render('home', { sampleHtmlReceipt: htmlReceipt(menu, sampleOrder) });

exports.about = (req, res) => res.render('about');

exports.makeHtmlReceipt = (req, res) => res.render('makeHtmlReceipt', { receipt: htmlReceipt(req.body.menu, req.body.order) });

exports.notFound = (req, res) => res.render('404');

exports.serverError = (err, req, res, next) => res.render('500');
