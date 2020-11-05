# Till Tech Test aka Ryan's Receipts

A receipt generating API that accepts menus and orders in JSON format in the form of a POST request and returns a receipt in JSON or in HTML.

## Specification

Build a program that:
- generates a receipt for an order 
- receives a `menu.json` file containing information about the shop and prices of items 
- calculates and outputs correct amount of tax, line totals and total amount
- produces a receipt similiar to the [sample receipt](public/img/receipt.jpg)

## Extenion Features

- functionality to record payment amount and calculate correct change
- functionality to handle discounts such as a 5% discount on orders over $50, and a 10% muffin discount

## Set Up

Clone this repository and install dependencies 
```
// Jasmine for testing, nyc for code coverage
npm install
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

## Design Decisions

- No acceptance criteria was provided however I decided to replicate the [sample receipt](public/img/receipt.jpg) as closely as possible
- The tax rate was defined as 8.64%, which I decided to be included in the `order` data opposed to passing it in as an argument
- The cash (amount) used to pay is included in the `order` data
- I decided that the orders will be `json` objects to keep consistency with the provided `menu.json` and because JSON is a versatile language-agnostic median to transfer data

## Extension Design Decisions

- For the discounts I decided to separate the two forms of discount as one is applied to items while the other is applied to the total amount of the order/all the items after being discounted where necessary
- Details of both kind of discount are within the `order.json` file 
- The program has been designed for there to be multiple item discounts included but only ever one total amount discount with my presumption being there could be multiple item discounts but only ever one total discount applied to an order

## Notes
- Very pleased with 100% test code coverage
- Enjoyed refactoring the code base multiple times using Martin Fowler's Refactoring as a reference and inspiration
- This project made me explore the use of polymorphism (to replace conditional logic) and this was fun to do using JavaScript using ECMAScript 2015 Class function  

# Ryan's Receipts
I have used `Express` to serve the receipts genertor online. To start up the server and check out the webpsite move into the root directory:
```
node ryansreceipts.js
```

Using `Postman` I am able to send requests with sample `menu` and `order` `JSON` files and a receipt can be generated and sent back:
1. in the response body when a POST request is sent to `/makereceipt` 
2. via html

### Example Order

```
{
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
    "itemDiscounts" : [
        {
            "items": [
                "Blueberry Muffin",
                "Chocolate Chip Muffin"
            ],
            "percent": 10
        }
    ],
    "totalDiscount" : {
        "limit": 50,
        "percent": 5
    },
    "cash": 100.00
}
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
