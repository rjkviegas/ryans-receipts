const request = require('postman-request');
const { timeout } = require('../ryansreceipts');
const menuAndOrderJSON = require('../src/json/sampleOrders/discounted/menuAndOrder.json');


describe('Server',function () {
    let server;
    beforeAll(function() {
       server = require("../ryansreceipts");
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
            
            expect(data.status).toBe(201);
        });
        it("Body", function() {
            expect(data.body).toEqual({
                "receipt": {
                    "shopName":"The Coffee Connection",
                    "address":"123 Lakeside Way",
                    "phone":"16503600708",
                    "customer":"Geraldine",
                    "taxRate":8.64,
                    "items":[
                        {
                            "id":"Blueberry Muffin",
                            "quantity":10,
                            "unitPrice":4.05,
                            "amount":40.5,
                            "discPercent":10,
                            "discAmount":4.05,
                            "totalAmount":36.45
                        },
                        {
                            "id":"Chocolate Chip Muffin"
                            ,"quantity":8,
                            "unitPrice":4.05,
                            "amount":32.4,
                            "discPercent":10,
                            "discAmount":3.24,
                            "totalAmount":29.159999999999997
                        },
                        {
                            "id":"Tea",
                            "quantity":3,
                            "unitPrice":3.65,
                            "amount":10.95,
                            "discPercent":0,
                            "discAmount":0,
                            "totalAmount":10.95
                        }
                    ],
                    "itemDiscounts":[
                        {
                            "items": [
                                "Blueberry Muffin",
                                "Chocolate Chip Muffin"
                            ],
                            "percent":10,
                            "preAmount":72.9
                        }
                    ],
                    "preTaxTotal":76.56,
                    "taxTotal":6.614784000000001,
                    "totalAmount":83.174784,
                    "totalDiscount": {
                        "limit":50,
                        "percent":5,
                        "amount":83.174784
                    },
                    "finalAmount":79.0160448,
                    "cash":100,
                    "change":20.983955199999997
                }
            });
        });
    });
    
});