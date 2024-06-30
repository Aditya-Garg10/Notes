const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Get all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some Error Occured");
  }
});

//Add all the notes
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 5 }),
    body("description", "enter a min 5 char description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some Error Occured");
    }
  }
);

//update notes
router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      const {title,description,tag} = req.body;
    const newNote = {};
    if (title){newNote.title = title};
    if (description){newNote.description = description};
    if (tag){newNote.tag = tag};

    var note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Aloowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true})
    res.json({note})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal Error Occured");
    }
  }
);
//delete notes
router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      const {title,description,tag} = req.body;
    const newNote = {};
    if (title){newNote.title = title};
    if (description){newNote.description = description};
    if (tag){newNote.tag = tag};



    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Aloowed")
    }
    note = await Note.findByIdAndDelete(req.params.id,{$set: newNote},{new: true})
    res.json({"Sucess":"Note has benn deleted",note:note})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal Error Occured");
    }
  }
);

module.exports = router;
