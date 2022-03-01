const User = require('../models/user');
const Sighting = require('../models/sighting');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr
// now s3 can crud on our s3 buckets

const BUCKET = process.env.BUCKET;


module.exports = {
  signup,
  login, 
  profile,
};

async function profile(req, res){
  try {
    // find the user using the params from req
    // findOne- finds first match
    const user = await User.findOne({username: req.params.username})

    // find all sightings that belong to that user
    if(!user) return res.status(404).json({err: 'USER NOT FOUND'})

    // find all users with that userId, the call populate to pull in the whole user object
    const sightings = await Sighting.find({user:user._id}).populate("user").exec();
    console.log("SIGHTINGS-->", sightings)

     // send object back to client with all the users sightings, and the user properties
    res.status(200).json({sightings: sightings, user: user})
  } catch (err) {
    console.log(err)
    res.status(400).json({err})
  }
}




function signup(req, res) {
  console.log(req.body, req.file)

  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  // FilePath unique name to be saved to our butckt
  const filePath = `${uuidv4()}/${req.file.originalname}`
  const params = {Bucket: BUCKET, Key: filePath, Body: req.file.buffer};
  //your bucket name goes where collectorcat is 
  //////////////////////////////////////////////////////////////////////////////////
  s3.upload(params, async function(err, data){
    console.log(data, 'from aws') // data.Location is our photoUrl that exists on aws
    const user = new User({...req.body, photoUrl: data.Location});

    console.log("newUser", user);
    try {
      await user.save();
      const token = createJWT(user); // user is the payload so this is the object in our jwt
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      console.log("signup error", err);
      res.status(400).json(err);
    }



  })
  //////////////////////////////////////////////////////////////////////////////////
 
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user, ' this user in login')
    if (!user) return res.status(401).json({err: 'bad credentials'});
    // had to update the password from req.body.pw, to req.body password
    user.comparePassword(req.body.password, (err, isMatch) => {
        
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}


/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
