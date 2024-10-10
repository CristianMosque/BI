const express = require('express');
const router = express.Router();
const { pool } = require('../index');
const PDFDocument = require('pdfkit');
const fs = require('fs');

router.post('/generate', async (req, res) => {
  try {
    const { clientId, items } = req.body;
    
    // Fetch client details
    const [clientRows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [clientId]);
    if (clientRows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    const client = clientRows[0];

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    // Generate invoice number
    const [lastInvoice] = await pool.query('SELECT MAX(numero) as last FROM facturas');
    const invoiceNumber = (lastInvoice[0].last || 0) + 1;

    // Save invoice to database
    await pool.query('INSERT INTO facturas (numero, cliente_id, total, fecha) VALUES (?, ?, ?, NOW())', [invoiceNumber, clientId, total]);

    // Generate PDF
    const doc = new PDFDocument();
    const filename = `invoice-${invoiceNumber}.pdf`;
    doc.pipe(fs.createWriteStream(filename));

    doc.fontSize(25).text('Factura', 100, 80);
    doc.fontSize(10).text(`Número: ${invoiceNumber}`, 100, 120);
    doc.text(`Cliente: ${client.nombre}`, 100, 140);
    doc.text(`Cliente: ${client.nombre}`, 100, 140);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 100, 160);

    doc.moveDown();
    items.forEach((item, i) => {
      const y = 200 + i * 20;
      doc.text(item.description, 100, y);
      doc.text(item.quantity.toString(), 300, y);
      doc.text(`$${item.price.toFixed(2)}`, 350, y);
      doc.text(`$${(item.quantity * item.price).toFixed(2)}`, 400, y);
    });

    doc.moveDown();
    doc.text(`Total: $${total.toFixed(2)}`, 400, 200 + items.length * 20);

    doc.end();

    res.json({ message: 'Invoice generated successfully', filename });
  } catch (error) {
    res.status(500).json({ error: 'Error generating invoice' });
  }
});

module.exports = router;