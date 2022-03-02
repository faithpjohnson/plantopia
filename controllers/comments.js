const Sighting = require("../models/sighting");

module.exports = {
  create,
};

async function create(req, res) {
  console.log(req.body, " <- req.body", req.user);
  try {
    const sighting = await Sighting.findById(req.body.sightingid);
    sighting.comments.push({
      content: req.body.comment,
      user: req.user._id,
    }); //mutate
    await sighting.save(); //save
    res.status(201).json({ data: "comment added!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}
