const express = require('express');
const router = express.Router();
const { readNotes, deleteNote, readAndWrite } = require('../helpers/notes');
const uniqid = require('uniqid');
const NoteData = require('../db/db.json');




//GET ROUTE -- URL: '/api/notes'
router.get('/', (req, res) => {
  const fileData = readNotes();
  res.json(fileData);
});

//POST ROUTE
router.post('/', (req, res) => {

  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uniqid(),
    };

    readAndWrite(newNote);
    console.log(NoteData);
    // const response = {
    //   status: 'success',
    //   body: newNote,
    // };

    // console.log(response);
    res.status(201)
  } else {
    res.status(500).json('Error in posting review');
  }
});

router.delete('/:id', (req, res) => {
  res.send('Got a DELETE request at /user')
  if (req.params.id) {
    deleteNote(req.params.id);

    res.status(200);
  } else {
    res.status(500).json("Provide a Note ID");
  }
})

module.exports = router; 
