const Sighting = require("../models/sighting");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // initialize the S3 constructor

const BUCKET = process.env.BUCKET;

module.exports = {
  create,
  index,
  getByID,
  updateSighting,
  deleteSighting,
};

function create(req, res) {
  console.log(req.body, " <- req.body", req.file, " <photo", req.user);

  const filePath = `${uuidv4()}${req.file.originalname}`;
  const params = { Bucket: BUCKET, Key: filePath, Body: req.file.buffer };

  // s3 making a request to aws s3 bucket
  s3.upload(params, async function (err, data) {
    // check aws error
    if (err) return res.status(400).json({ err });
    // We're inside of the response from aws
    try {
      // model talking to mongodb
      let sighting = await Sighting.create({
        title: req.body.title,
        user: req.user,
        date: req.body.date,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        photoUrl: data.Location,
      });

      sighting = await sighting.populate("user");

      // respond to the client
      // What file on the client can we log out this response?
      res.status(201).json({ sighting });
    } catch (err) {
      console.log(err);
      res.status(400).json({ err });
    }
  });
}

async function index(req, res) {
  try {
    //this populates the user when you find the sightings
    const sightings = await Sighting.find({})
      .populate("user")
      .populate("comments")
      .exec();
    res.status(200).json({ sightings: sightings });
  } catch (err) {
    res.status(400).json({ err });
  }
}

async function getByID(req, res) {
  try {
    //this populates the user when you find the sightings
    const sightings = await Sighting.find({ _id: req.params.sightingID })
      .populate("user")
      .populate("comments.user")
      .exec();
    res.status(200).json(sightings[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}

async function updateSighting(req, res) {
  console.log("updateSighting");
  try {
    console.log(req.params, req.body);
    const sightings = await Sighting.find({ _id: req.body._id });
    if (sightings.length === 0) {
      res.status(400).json({ message: "sighting not found" });
      return;
    }

    const sighting = sightings[0];
    sighting.title = req.body.title;
    sighting.date = req.body.date;
    sighting.country = req.body.country;
    sighting.state = req.body.state;
    sighting.city = req.body.city;

    sighting.save(function (err) {
      res.status(201).json(sighting);
    });
  } catch (err) {
    console.log(err);
  }
}

async function deleteSighting(req, res) {
  try {
    const sighting = await Sighting.findOneAndDelete({
      _id: req.body._id,
    });
    console.log("body", req.body)
    console.log("SIGHTING TO DELETE", sighting);
    res.status(201).json( sighting );
  } catch (err) {
    res.status(400).json({ err });
  }
}
