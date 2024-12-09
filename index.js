const express = require('express');
var cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/api/test', (req, res) => {
  res.send('This is working');
});

app.post('/api/form', (req, res) => {
  
  //Enviar un HTML con los datos del formulario
  res.setHeader('Content-Type', 'text/html');
  const body = req.body;

  console.log(body);

  const rows = Object.keys(body).length == 0 ? '<tr><td colspan="2">No hay datos</td></tr>' :  
    Object.keys(body).map(key => {
      return `<tr><td>${key}</td><td>${body[key]}</td></tr>`;
    }).join('');
  
  const origin = req.get('origin');
  const backButton = origin ? `<p><a href="${origin}">Regresar</a></p>` : '';


  //genear un HTML con una tabla con los datos del formulario
  let html = `
    <html>
      <head>
        <style>
          body {font-family: Arial, sans-serif;}
          table {border-collapse: collapse;}table, th, td {border: 1px solid black;padding: 5px;}
        </style>
      </head>
      <body>
        <h1>Datos Recibidos del Formulario</h1>
        <table>
          <tr>
            <th>Dato</th><th>Valor</th>
          </tr>
          ${rows}
        </table>
        ${backButton}
      </body>
    </html>`;
    res.send(html);
});


// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});