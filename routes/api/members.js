const express = require("express");
const members = require("../../data");
const { v4: uuid } = require("uuid");

const router = express.Router();

//get all members
router.get("/", (req, res) => res.json(members));

//get single member
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const found = members.find((member) => member.id == id);

  if (!found) {
    res.status(400).json({ msg: `No member with the id of ${id}` });
    res.send("no id inshalllaaaahh");
    return;
  }

  res.status(200);
  res.json(members.filter((member) => member.id == id));
});

//create a member
router.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const newMember = {
    id: uuid(),
    name,
    email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: "Please include a name and email" });
  }
  members.push(newMember);
  res.json(members);
});

//update single member
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const found = members.find((member) => member.id == id);

  if (!found) {
    res.status(400).json({ msg: `No member with the id of ${id}` });
    res.send("no id inshalllaaaahh");
    return;
  }

  const newName = req.body.name;
  const newemail = req.body.email;

  if (!newName) {
    console.log("please a name");
    return;
  }

  if (!newemail) {
    console.log("please an email");
    return;
  }

  const memberToUpdate = members.find((member) => member.id == id);

  memberToUpdate.name = newName;
  memberToUpdate.email = newemail;

  res.status(200);
  res.json({ msg: "member updayed", members });
});

module.exports = router;
