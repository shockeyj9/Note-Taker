const fs = require('fs');

const readNotes = () => {
  const fileData = JSON.parse(fs.readFileSync('./db/db.json'));
  return fileData;
}

function deleteNote (rmvdObj) {
    const fileData = JSON.parse(fs.readFileSync('./db/db.json'));
    const finalArray = fileData.filter(el => el.id !== rmvdObj);
    fs.writeFile(`./db/db.json`, JSON.stringify(finalArray, null, 2), (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for note ID ${rmvdObj} has been deleted from JSON file`
          )
    )

    readNotes();
};

function readAndWrite (newNote){
    //Reads database information in, pushes the new note to the end
    const fileData = JSON.parse(fs.readFileSync('./db/db.json'));
    fileData.push(newNote);

    //writes the read in data+new note back to the file
    fs.writeFile(`./db/db.json`, JSON.stringify(fileData, null, 2), (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newNote.title} has been written to JSON file`
          )
    )
    
    readNotes();

};

module.exports = {readNotes, deleteNote,readAndWrite};
