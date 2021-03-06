# MyPhotoJourney

[Live Demo](https://myphotojourney.herokuapp.com "MyPhotoJourney")

Hello! Thanks for checking out our MERN stack project.

MyPhotoJourney is a MERN full stack app that lets you upload photos from a trip, visualize them on a map, and share it for all to see!

## Index

* [The Team](https://github.com/MasonChinkin/MyPhotoJourney/blob/master/README.md#The-Team)
* [Technologies](https://github.com/MasonChinkin/MyPhotoJourney/blob/master/README.md#technologies)
* [Highlights](https://github.com/MasonChinkin/MyPhotoJourney/blob/master/README.md#highlights)
  * [Storing uploaded photos on AWS](https://github.com/MasonChinkin/MyPhotoJourney/blob/master/README.md#Storing-uploaded-photos-on-AWS)
  * [Making a journey](https://github.com/MasonChinkin/MyPhotoJourney/blob/master/README.md#Making-a-journey)
  
## The Team

[Mason Chinkin, a.k.a. "The visualizer"](https://github.com/MasonChinkin)
* d3.js map, mongoose.js backend, express.js map api

[Nick Howlett, a.k.a. "The authorizer"](https://github.com/Nick-Howlett)
* Photo Metadata, End to end user auth, profile page, Heroku

[Louis Leon, a.k.a. "The validator"](https://github.com/Louis-C-Leon)
* Photo uploading/validation, gps api

[Drew Engelstein, a.k.a. "The uploader"](https://github.com/ase1210)
* AWS, photo uploading, upload forms

## Technologies

* MERN stack: MongoDB, Express.js, React/Redux, Node.js
* d3.js for mapping the journey
* AWS with multer.js for uploading and storing users' photos
* node-geocoder.js + OpenStreetMap to fetch gps locations based on user input
* End to end user auth with BCrypt and passport
* mongoose.js backend schema

## Highlights

### Storing uploaded photos on AWS
Storing uploaded photos on AWS was the biggest challenge faced by the team. Louis and Drew worked for over two days with multer.js to build a bug free, reliable backend framework to validate and upload photos to AWS before saving the photo URL to our MongoDB database.

Below is a code snippet of our backend route that first uploads the image to AWS, validates the user inputs, and then fetches the geo-location for the provided city and country before saving the photo to our DB:
```Javascript
router.post("/", upload.single("image"), passport.authenticate("jwt", { session: false }),
  async (req, res) => {
  ...
  ...
  const { errors, isValid } = await validatePhotoInput(photo);
  ...
  ...
  let options = { city: photo.city, country: photo.country };
  let data = await geocoder.geocode(options);

  if (data.length === 0) {
    errors.location = "Enter a valid city/country location";
    return res.status(400).json(errors);
  }

```

![](https://github.com/MasonChinkin/MyPhotoJourney/blob/dev/frontend/public/photoJourneyPhotoUpload.gif?raw=true)

### Making a journey
After photos are validated, uploaded to AWS, and saved to MongoDB with their associated journey, the user is taken to the journey page, where we used params to fetch those photo URLs for the journey.

![](https://github.com/MasonChinkin/MyPhotoJourney/blob/dev/frontend/public/photoJourneyUploadToMap.gif?raw=true)
