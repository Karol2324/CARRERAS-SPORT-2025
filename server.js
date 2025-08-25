const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 3000;

// Cargar los archivos del certificado y la clave
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// Servir los archivos estáticos desde la raíz del proyecto
app.use(express.static(__dirname));

https.createServer(options, app).listen(port, () => {
  console.log(`Servidor HTTPS escuchando en https://localhost:${port}`);
});