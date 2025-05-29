# File PDF or CSV Generate Service (Lightweight API)

This service provides a simple way to **generate reports in PDF or CSV format** using Node.js.  
Designed as a lightweight API for quick and easy report generation without heavy dependencies.

---

## 🚀 Quick Setup

You’ll need to install the necessary npm packages:

```bash
npm install
```

----

# TEST
```bash
curl --location 'http://localhost:3001/generate-csv' \
--header 'Content-Type: application/json' \
--data '[
    {
        "firstName": "John",
        "lastName": "Doe",
        "baskets": [
        [
            { "name": "apple", "price": "1.2", "expiryDate": "2025-06-01" },
            { "name": "banana", "price": "0.5", "expiryDate": "2025-05-15" }
        ],
        [
            { "name": "carrot", "price": "0.8", "expiryDate": "2025-04-30" }
        ]
        ]
    }
]'
```
