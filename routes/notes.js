const router = require('express').Router();
const {deleteNote,readAndWrite} = require('../helpers/notes');
const uniqid = require('uniqid');




//GET ROUTE -- URL: '/api/notes'
router.get('/', (req, res) => {
  const NoteData = require('../db/db.json');
  res.json(NoteData);
}
);

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

router.delete('/:id', (req, res) => {
  res.send('Got a DELETE request at /user')
  if (req.params.id){ 
    deleteNote(req.params.id);
    

  }else{
    res.status(500).json("Provide a Note ID");
  }
})

module.exports = router; 