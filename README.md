# Ryan's Receipts

A receipt generating API hosted on AWS.<br />

## Receipt Endpoint

```
http://api.ryansreceipts/makereceipt
```

Serving `POST` requests which contain `menu` and `order` `JSON` data, [request body example](###example-request-body), with a receipt in `JSON` format, [response body example](###example-response-body).<br />

Calculates line totals, tax total and overall order total. Discounts can be applied for specific items and/or for the total amount. The change is also computed.


## Set Up

Clone this repository and install dependencies 
```
npm install
```
To start up the server and check out the website move into the root directory:
```
npm start
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

## Technologies
- NodeJS
- Express
- AWS (EC2)
- Nginx
- PM2
- Jasmine
- Postman
- Istanbul/NYC

### Example Request Body

```
{
    "menu" : {
        "shopName": "The Coffee Connection",
        "address": "123 Lakeside Way",
        "phone": "16503600708",
        "prices": {
            "Tea": 3.65,
            "Blueberry Muffin": 4.05,
            "Chocolate Chip Muffin": 4.05,
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
{
    "receipt": {
        "shopName": "The Coffee Connection",
        "address": "123 Lakeside Way",
        "phone": "16503600708",
        "customer": "Geraldine",
        "taxRate": 8.64,
        "items": [
            {
                "id": "Blueberry Muffin",
                "quantity": 10,
                "unitPrice": 4.05,
                "amount": 40.5,
                "discPercent": 10,
                "discAmount": 4.05,
                "totalAmount": 36.45
            },
            {
                "id": "Chocolate Chip Muffin",
                "quantity": 8,
                "unitPrice": 4.05,
                "amount": 32.4,
                "discPercent": 10,
                "discAmount": 3.24,
                "totalAmount": 29.159999999999997
            },
            {
                "id": "Tea",
                "quantity": 3,
                "unitPrice": 3.65,
                "amount": 10.95,
                "discPercent": 0,
                "discAmount": 0,
                "totalAmount": 10.95
            }
        ],
        "itemDiscounts": [
            {
                "items": [
                    "Blueberry Muffin",
                    "Chocolate Chip Muffin"
                ],
                "percent": 10,
                "preAmount": 72.9
            }
        ],
        "preTaxTotal": 76.56,
        "taxTotal": 6.614784000000001,
        "totalAmount": 83.174784,
        "totalDiscount": {
            "limit": 50,
            "percent": 5,
            "amount": 83.174784
        },
        "finalAmount": 79.0160448,
        "cash": 100,
        "change": 20.983955199999997
    }
}
```

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
I want item specific discounts to be applicable

As the coffee shop owner
So I can offer discount when customers spend over a certain amount
I want total specific discounts to be applicable
```
