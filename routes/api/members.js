const express = require("express");
let members = require("../../data");
const { v4: uuid } = require("uuid");

const router = express.Router();

//get all members
router.get("/", (req, res) => res.json(members));

//get single member
router.get("/:id", (req, res) => {
  const id = req.params.id;

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
    return;
  }
  members.push(newMember);
  res.json(members);
});

//update single member
router.put("/:id", (req, res) => {
  const id = req.params.id;

  const found = members.find((member) => member.id == id);
  console.log(id, found);

  if (!found) {
    res.status(400).json({ msg: `No member with the id of ${id}` });
  }

  const newName = req.body.name;
  const newemail = req.body.email;

  if (!newName) {
    return console.log("please provide a name");
  }

  if (!newemail) {
    return console.log("please provide an email");
  }

  const memberToUpdate = members.find((member) => member.id == id);

  memberToUpdate.name = newName;
  memberToUpdate.email = newemail;

  res.status(200);
  res.json({ msg: "member updated", members });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400);
    res.send("please provide an ID");
    return;
  }
  console.log(id);
  membersToKeep = members.filter((member) => member.id != id);
  console.log(membersToKeep);
  if (!membersToKeep) {
    res.status(400);
    res.send(`No member available with id: ${id}`);
    return;
  }
  res.json({ msg: "member deleted", membersToKeep });
});

module.exports = router;
