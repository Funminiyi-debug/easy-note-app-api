const Note = require('../models/note.model');

//create and save a new note
exports.create = (req, res) => {
    // to validate the request 
    if(!req.body.content) {
       return res.status(400).send({
           message: 'Note content can not be empty'
       })
    }

    //if it isn't empty, then we want to create a note
    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content
    });

    // now let's save that
    note.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured while creating this note'
        });
    });
};


exports.findAll = (req, res) => {
    // this is to retrieve and send all notes from the database 
    Note.find()
    .then( notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'some error occured while checking the database for all notes'
        });
    });

};


exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: 'Note note found with Id' + req.params.noteId
            })
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'Note not found with id ' + req.params.noteId
            })
        }
        return res.status(500).send({
            message: 'Error retrieving note with id ' + req.params.noteId
        })
    })
}

exports.update = (req, res) => {
    // validate request 
    if(!req.body.content) {
        return res.status(400).send({
            message: 'Note content cannot be empty'
        })
    }
    
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || 'Untitled note',
        content: req.body.content
    }, { new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: 'note not found with id' + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'note not found with id ' + req.params.noteId
            })
        }
        return res.status(500).send({
            message: 'error updating ntoe with id '+ req.params.noteId
        });
    });
};

exports.delete = (req, res) => {
    Note.findByIdAndDelete(req.params.noteId)
    .then(note => {
        if(!note){
            return res.status(404).send({
                message: 'note not found with id ' + req.params.noteId
            })
        }
        res.send({ message: 'Note deleted successfully' })
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'note not found with id ' + req.params.noteId
            })
        }

        return res.status(500).send({
            message: err.message || 'Some error occured while deleting this note'
        })
    })
}