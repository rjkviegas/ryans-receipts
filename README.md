# Till Tech Test aka Ryan's Receipts

A till tech test that grew into a receipt generating API. It calculates tax, line totals, total amount, amount of discount and change. It accepts a menu and an order in JSON format in a request body and returns a receipt in JSON or in HTML.

## Receipt Endpoints
I have used `Express` to serve `POST` requests which can contain `menu` and `order` data (in `JSON` format) in the request body and respond with a receipt in either `JSON` or `HTML` format. After initially manually testing using the `Postman` web dashboard I have begun to add automated tests using `Postman-request`.

- For `JSON` receipt the endpoint is `/makereceipt` 
- For `HTML` receipt the endpoint is `./makehtmlreceipt`

## Set Up

Clone this repository and install dependencies 
```
npm install
```
To start up the server and check out the website move into the root directory:
```
node ryansreceipts.js
```

### Testing

Move into root folder:
```
npm test
```
For coverage 
```
npm run coverage
```

## Specification of Till Tech Test

Build a program that:
- generates a receipt for an order 
- receives a `menu.json` file containing information about the shop and prices of items 
- calculates and outputs correct amount of tax, line totals and total amount
- produce a receipt similiar to provided [sample receipt](public/img/receipt.jpg)
- functionality to record payment amount and calculate correct change
- functionality to handle discounts such as a 5% discount on orders over $50, and a 10% muffin discount

## Design Decisions

- No acceptance criteria was provided however I decided to replicate the [sample receipt](public/img/receipt.jpg) as closely as possible
- The tax rate was defined as 8.64%, which I decided to be included in the `order` data opposed to passing it in as an argument
- The cash (amount) used to pay is included in the `order` data
- I decided that the orders will be `json` objects to keep consistency with the provided `menu.json` and because JSON is a versatile language-agnostic median to transfer data

## Extension Design Decisions

- For the discounts I decided to separate the two forms of discount as one is applied to items while the other is applied to the total amount of the order/all the items after being discounted where necessary
- Details of both kind of discount are within the `order.json` file 
- The program has been designed for there to be multiple item discounts included but only ever one total amount discount with my presumption being there could be multiple item discounts but only ever one total discount applied to an order
- Factory Methods to decide whether the receipt needs discounts applied to specific items and/or the total amount. 

## Notes
- Very pleased with 90+% code coverage and enjoyng the challenge of learning how to test APIs using `Postman`
- Wish to improve file structure of project
- Enjoyed refactoring the code base multiple times using Martin Fowler's Refactoring as a reference and inspiration
- This project made me explore the use of polymorphism and using Factory Methods (to replace conditional logic) and this was fun to do in JavaScript using ECMAScript 2015 Class function 
- Need to add automated tests for API calls using Jasmine

### Example Request Body

```
{
    "menu" : {
        "shopName": "The Coffee Connection",
        "address": "123 Lakeside Way",
        "phone": "16503600708",
        "prices": {
            "Cafe Latte": 4.75,
            "Flat White": 4.75,
            "Cappucino": 3.85,
            "Single Espresso": 2.05,
            "Double Espresso": 3.75,
            "Americano": 3.75,
            "Cortado": 4.55,
            "Tea": 3.65,
            "Choc Mudcake": 6.40,
            "Choc Mousse": 8.20,
            "Affogato": 14.80,
            "Tiramisu": 11.40,
            "Blueberry Muffin": 4.05,
            "Chocolate Chip Muffin": 4.05,
            "Muffin Of The Day": 4.55
        }
    },
    "order": {
        "customer": "Geraldine",
        "items": [
            {
                "id": "Blueberry Muffin",
                "quantity": 10
            },
            {
                "id": "Chocolate Chip Muffin",
                "quantity": 8
            },
            {
                "id": "Tea",
                "quantity": 3
            }
        ],
        "taxRate": 8.64,
        "itemDiscounts": [
            {
                "items": [
                    "Blueberry Muffin",
                    "Chocolate Chip Muffin"
                ],
                "percent": 10
            }
        ],
        "totalDiscount": {
            "limit": 50,
            "percent": 5
        },
        "cash": 100.00
    }
    
}
```

### Example Response Body
```
{"receipt":{"shopName":"The Coffee Connection","address":"123 Lakeside Way","phone":"16503600708","customer":"Geraldine","taxRate":8.64,"items":[{"id":"Blueberry Muffin","quantity":10,"unitPrice":4.05,"amount":40.5,"discPercent":10,"discAmount":4.05,"totalAmount":36.45},{"id":"Chocolate Chip Muffin","quantity":8,"unitPrice":4.05,"amount":32.4,"discPercent":10,"discAmount":3.24,"totalAmount":29.159999999999997},{"id":"Tea","quantity":3,"unitPrice":3.65,"amount":10.95,"discPercent":0,"discAmount":0,"totalAmount":10.95}],"itemDiscounts":[{"items":["Blueberry Muffin","Chocolate Chip Muffin"],"percent":10,"preAmount":72.9}],"preTaxTotal":76.56,"taxTotal":6.614784000000001,"totalAmount":83.174784,"totalDiscount":{"limit":50,"percent":5,"amount":83.174784},"finalAmount":79.0160448,"cash":100,"change":20.983955199999997}}
```
### Example HTML Receipt
![Example HTML Receipt](https://raw.githubusercontent.com/rjkviegas/till-tech-test/main/public/img/htmlexamplereceipt.PNG) 

## User Stories
```
As the coffee shop owner
So it's clear where the receipt is from
I want the receipt to display the coffee shop's information

As the coffee shop owner
So I can charge customers for what they ordered
I want the receipt to display what they ordered

As the coffee shop owner
So I can create bespoke receipts for customers
I want to be able to include their name on the receipt

As the coffee shop owner
So I only have to update one list of price information
I want the receipt program to use our json price file

As the coffee shop owner
So I charge the customers the correct amount
I want the line totals correctly calculated and displayed on the receipt

As the coffee shop owner
So I charge the customers the correct amount
I want the tax correctly calculated and displayed on the receipt

As the coffee shop owner
So I charge the customers the correct amount
I want the total amount correctly calculated and displayed on the receipt

As the coffee shop owner
So I can offer customers item specific discounts
I want item specific discounts to be appliable

As the coffee shop owner
So I can offer discount when customers spend over a certain amount
I want total specific discounts to be appliable
```
