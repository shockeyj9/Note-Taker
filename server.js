const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const api = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//ROUTE FOR API/DATA
app.use(api);

//ROUTERS FOR STATIC HTML PAGES
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port http://localhost:${PORT}/`)
);