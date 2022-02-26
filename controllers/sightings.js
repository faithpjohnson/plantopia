const Sighting = require("../models/sighting");

const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // initialize the S3 constructor

const BUCKET = process.env.BUCKET;

module.exports = {
  create,
  index,
  getByID,
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
    const sightings = await Sighting.find({}).populate("user").exec();
    res.status(200).json({ sightings: sightings });
  } catch (err) {
    res.status(400).json({ err });
  }
}

async function getByID(req, res) {
  try {
    //this populates the user when you find the sightings
    const sightings = await Sighting.find({_id: req.params.sightingID}).populate("user").exec();
    res.status(200).json(sightings[0]);
  } catch (err) {
    res.status(400).json({ err });
  }
}
