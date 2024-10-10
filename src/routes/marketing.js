const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { Client } = require('whatsapp-web.js');

// Configuración de nodemailer (para email marketing)
const transporter = nodemailer.createTransport({
  // Configura aquí tu servicio de email
});

// Configuración de WhatsApp Web (para mensajes masivos)
const client = new Client();
client.initialize();

// Ruta para enviar email marketing
router.post('/email', async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    await transporter.sendMail({ to, subject, text });
    res.json({ message: 'Email enviado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar email' });
  }
});

// Ruta para enviar mensajes masivos por WhatsApp
router.post('/whatsapp', async (req, res) => {
  const { to, message } = req.body;
  try {
    await client.sendMessage(to, message);
    res.json({ message: 'Mensaje de WhatsApp enviado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar mensaje de WhatsApp' });
  }
});

module.exports = router;