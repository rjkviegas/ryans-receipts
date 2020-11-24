const request = require('postman-request');
const menuAndOrderJSON = require('../../src/json/sampleOrders/discounted/menuAndOrder.json');
const createReceipt = require('../../src/lib/createReceiptData');
const { receipt, htmlReceipt } = require('../../src/lib/receipt');


describe('Server test',function () {
    let server;
    beforeAll(function() {
       server = require("../../ryansreceipts");
    });
    afterAll(function() {
        server.close();
    });
    describe("POST /makereceipt", function() {
        let data = {};
        beforeAll(function(done) {
            request({
                method: 'POST',
                uri: "http://localhost:3000/makereceipt",
                body: menuAndOrderJSON,
                json: true
            }, function(error, response, body) {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", function() {
            expect(data.status).toBe(200);
        });
        it("Body", function() {
            expect(data.body).toEqual(
                { "receipt": createReceipt(menuAndOrderJSON.menu, menuAndOrderJSON.order) }
            );
        });
    });

    describe("POST /plaintextreceipt", function() {
        let data = {};
        beforeAll(function(done) {
            request({
                method: 'POST',
                uri: "http://localhost:3000/plaintextreceipt",
                body: menuAndOrderJSON,
                json: true
            }, function(error, response, body) {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", function() {
            expect(data.status).toBe(200);
        });
        it("Body", function() {
            expect(data.body).toEqual(receipt(menuAndOrderJSON.menu, menuAndOrderJSON.order));
        });
    });

    describe("POST /htmlreceipt", function() {
        let data = {};
        beforeAll(function(done) {
            request({
                method: 'POST',
                uri: "http://localhost:3000/htmlreceipt",
                body: menuAndOrderJSON,
                json: true
            }, function(error, response, body) {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", function() {
            expect(data.status).toBe(200);
        });
        it("Body", function() {
            expect(data.body).toEqual(htmlReceipt(menuAndOrderJSON.menu, menuAndOrderJSON.order));
        });
    });
});