const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3001;
const path = require('path');
const NoteData = require('./db/db.json');
const fs = require('fs');

app.use(express.static('public'));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('/api/notes', (req, res) => res.json(NoteData));

app.post('/api/notes', (req, res) => {

  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    const newNote = {
      title,
      text,
    };

    //Reads database information in, pushes the new note to the end
    const fileData = JSON.parse(fs.readFileSync('./db/db.json'));
    fileData.push(newNote);

    //writes the read in data+new note back to the file
    fs.writeFileSync(`./db/db.json`, JSON.stringify(fileData, null, 2), (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newNote.title} has been written to JSON file`
          )
    );

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});


app.listen(PORT, () =>
  console.log(`Serving static asset routes on port http://localhost:${PORT}/`)
);