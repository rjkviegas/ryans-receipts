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

describe("About page", function () {

    it("renders", function () {
        const req = {};
        const res = { render: function(){} };
        const spy = spyOn(res, "render");

        handlers.about(req, res);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('about');
    });
});

describe("Not Found page", function () {

    it("renders", function () {
        const req = {};
        const res = { render: function(){} };
        const spy = spyOn(res, "render");

        handlers.notFound(req, res);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('404');
    });
});

describe("Server error page", function () {

    it("renders", function () {
        const error = "Test"
        const req = {};
        const res = { render: function(){} };
        const next = function(){};
        const spy = spyOn(res, "render");

        handlers.serverError(error, req, res, next);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('500');
    });
});