module.exports = (app) => {
    const notes = require ('../controllers/note.controller.js');

    // to create a new note 
    app.post('/notes', notes.create);

    // retrieve all notes 
    app.get('/notes', notes.findAll);

    // to retrieve a single note with noteID
    app.get('/notes/:noteId', notes.findOne);

    // update a note with noteid
    app.put('/notes/:noteId', notes.update);

    app.delete('/notes/:noteId', notes.delete);
}