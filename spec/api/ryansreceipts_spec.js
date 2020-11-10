const request = require('postman-request');
const menuAndOrderJSON = require('../../src/json/sampleOrders/discounted/menuAndOrder.json');
const createReceipt = require('../../src/lib/createReceiptData');


describe('Server',function () {
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
        it("Status 201", function() {
            expect(data.status).toBe(201);
        });
        it("Body", function() {
            expect(data.body).toEqual(
                { "receipt": createReceipt(menuAndOrderJSON.menu, menuAndOrderJSON.order) }
            );
        });
    });
    describe("POST /makehtmlreceipt", function() {
        let data = {};
        beforeAll(function(done) {
            request({
                method: 'POST',
                uri: "http://localhost:3000/makehtmlreceipt",
                body: menuAndOrderJSON,
                json: true
            }, function(error, response, body) {
                data.status = response.statusCode;
                done();
            });
        });
        it("Status 201", function() {
            expect(data.status).toBe(201);
        });
    });
    
});