const router = require('express').Router();

//GET ROUTE -- URL: '/api/notes'
router.get('/', (req, res) => res.json(NoteData));

router.post('/', (req, res) => {

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

router.delete('/:id', (req, res) => {
  res.send('Got a DELETE request at /user')
  if (req.params.id){
    let results = res.json(NoteData);
    console.log(results);
    const fileData = JSON.parse(fs.readFileSync('./db/db.json'));
    //THIS ONLY WORKS WHEN THE NUMBER IS ENTERED, IT DOESN'T WORK IF A VARIABLE IS PASSED IN??
    const choice = fileData.find(e => e.id === 2);
  }else{
    res.status(500).json("Provide a Note ID");
  }
})

module.exports = router; 