const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());

function generateCSV(jsonData, res) {
    const header = 'First Name, Last Name, Basket, Fruit Name, Price, Expiry Date\n';
    let csvContent = header;

    jsonData.forEach((user) => {
        user.baskets.forEach((basket) => {
            basket.forEach((fruit) => {
                csvContent += `${user.firstName}, ${user.lastName}, Basket, ${fruit.name}, ${fruit.price}, ${fruit.expiryDate}\n`;
            });
        });
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('report.csv');
    res.send(csvContent);
}

function generatePDF(jsonData, res) {
    const doc = new PDFDocument();
    console.log(jsonData.baskets);
    doc.pipe(res);

    doc.fontSize(16).text(`User Name: ${jsonData.firstName || 'N/A'}`);
    doc.text(`Last Name: ${jsonData.lastName || 'N/A'}`);

      const imagePath = path.join('C:', 'Users', 'Mong', 'Pictures', 'ajazzicon', '0.png');
      if (fs.existsSync(imagePath)) {
        doc.image(imagePath, {
          fit: [150, 150],
          align: 'center',
          valign: 'center'
        });
      } else {
        doc.text('[Image not found]');
      }

      doc.moveDown().fontSize(14).text('Fruits List:', { underline: true });
      if (Array.isArray(jsonData.baskets)) {
        jsonData.baskets.forEach((fruit, index) => {
          doc.moveDown(0.5).fontSize(12).text(
            `${index + 1}. Name: ${fruit.name}\n   Price: ${fruit.price}\n   Expire Date: ${fruit.expiryDate}`
          );
        });
      } else {
        doc.text('No fruit data available.');
      }

      doc.end();


}

app.post('/generate-csv', (req, res) => {
    const jsonData = req.body;
    generateCSV(jsonData, res);
});

app.post('/generate-pdf', (req, res) => {
    const jsonData = req.body;
    generatePDF(jsonData, res);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
