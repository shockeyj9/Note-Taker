const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
const NoteData = require('./db/db.json');

// Static middleware pointing to the public folder
app.use(express.static('public'));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('/api/notes', (req, res) => res.json(NoteData));




app.listen(PORT, () =>
  console.log(`Serving static asset routes on port http://localhost:${PORT}/`)
);