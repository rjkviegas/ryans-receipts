const handlers = require('../src/handlers');
const { htmlReceipt } = require('../src/lib/receipt');
const menu = require('../src/json/menus/menu.json');
const sampleOrder = require('../src/json/sampleOrders/discounted/itemAndTotalDiscOrder.json');

describe("Home page", function () {

    it("renders view and sample HTML receipt", function () {
        const req = {};
        const res = { render: function(){} };
        const spy = spyOn(res, "render");

        handlers.home(req, res);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('home', { sampleHtmlReceipt: htmlReceipt(menu, sampleOrder) });
    });

});