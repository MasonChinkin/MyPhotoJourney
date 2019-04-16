const db = require('./config/keys').MongoUri;
const mongoose = require("mongoose");
const Journey = require("./models/Journey");
const Photo = require("./models/Photo");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('connection established'))
  .catch(err => console.log(err));



Journey.deleteMany({userId: "5c8932bde951c20e0e35e6eb"}, err => {
  console.log(err);
});
const JapanTrip = new Journey({name: "Japan Trip", description: "Summer of 2013", userId: "5c8932bde951c20e0e35e6eb"});
JapanTrip.save((err, journey) => {
  Photo.insertMany([
    {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554692344571","city":"Tokyo","country":"Japan","photoDateTime": "2013-07-21T00:00:00.000+00:00","description":"Kyu-Furukawa Gardens","latitude": "35.6828387","longitude": "139.7594549","journeyId": journey.id},
    {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554692586162","city":"Arashiyama","country":"Japan","photoDateTime": "2013-07-31T00:00:00.000+00:00","description":"Lotus","latitude": "35.0102297","longitude": "135.6817485","journeyId": journey.id},
    {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554692585573","city":"Hiroshima","country":"Japan","photoDateTime": "2013-08-02T00:00:00.000+00:00","description":"Atomic Dome","latitude": "34.3916058","longitude": "132.4518156","journeyId": journey.id},
    {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554692587102","city":"Haguro Machi","country":"Japan","photoDateTime": "2013-07-25T00:00:00.000+00:00" ,"description":"Pagoda by Haguro-san","latitude": "36.8935094","longitude": "137.5541886","journeyId": journey.id},
    {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554692604007","city":"Matsumoto","country":"Japan","photoDateTime": "2013-07-23T00:00:00.000+00:00","description":"Matsumoto Castle","latitude": "36.2382047", "longitude": "137.9687141","journeyId": journey.id},
    {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554692613222","city":"Nagano","country":"Japan","photoDateTime": "2013-07-22T00:00:00.000+00:00","description":"Statue by Temple","latitude": "36.1143945", "longitude": "138.0319015","journeyId": journey.id},
    {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554692621858","city":"Kyoto","country":"Japan","photoDateTime": "2013-07-30T00:00:00.000+00:00","description":"Koi Pond","latitude": "35.021041","longitude": "135.7556075","journeyId": journey.id}
  ]); 
});
  const MasonTrip = new Journey({name: "Mason and Elisha's Europe Trip", description: "Fall of 2017", userId: "5c8932bde951c20e0e35e6eb"});
  MasonTrip.save((err, journey) => {
    Photo.insertMany([
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554936471904","city":"Jerusalem","country":"Israel","photoDateTime": "2017-07-10T00:00:00.000+00:00","description":"Perfect sweet potato soup for Mason's cold.","latitude": "31.778345","longitude": "35.2250786","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554936517775","city":"Tel Aviv","country":"Israel","photoDateTime": "2017-07-12T00:00:00.000+00:00","description":"Relaxing trip to the farmer's market.","latitude": "32.0804808","longitude": "34.7805274","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554936565748","city":"Istanbul","country":"Turkey","photoDateTime": "2017-07-14T00:00:00.000+00:00","description":"We hiked to a hilltop mosque with a view of the whole city","latitude": "41.0766019","longitude": "29.052495","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554936613427","city":"Melnik","country":"Bulgaria","photoDateTime": "2017-07-18T00:00:00.000+00:00","description":"We hiked an abandoned trail above the town.","latitude": "41.5229421","longitude": "23.393246","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554936700971","city":"Rila","country":"Bulgaria","photoDateTime": "2017-07-19T00:00:00.000+00:00","description":"Relaxed while walking along the river outside the monastery.","latitude": "42.1105864","longitude": "23.2399446673903","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554936757292","city":"Sofia","country":"Bulgaria","photoDateTime": "2017-07-20T00:00:00.000+00:00","description":"Saw a raucous Roma wedding parade.","latitude": "42.6978634","longitude": "23.3221789","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554936787294","city":"Skopje","country":"Macedonia","photoDateTime": "2017-07-22T00:00:00.000+00:00","description":"Had an amazing lunch for $2.","latitude": "41.9960924","longitude": "21.4316495","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554936838301","city":"Kotor","country":"Montenegro","photoDateTime": "2017-07-23T00:00:00.000+00:00","description":"Water so clear Mason had a gut reaction that he was about to fall when he looked down.","latitude": "42.4242488","longitude": "18.771267","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554936929632","city":"Dubrovnik","country":"Croatia","photoDateTime": "2017-07-25T00:00:00.000+00:00","description":"100+ degrees with no wind because stunning city walls.","latitude": "42.6499638","longitude": "18.0936953","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554936995885","city":"Split","country":"Croatia","photoDateTime": "2017-07-27T00:00:00.000+00:00","description":"Rickety bell tower staircase gave us a panic attack.","latitude": "43.5115555","longitude": "16.4396801","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554937031119","city":"Vis","country":"Croatia","photoDateTime": "2017-07-29T00:00:00.000+00:00","description":"Watched the sunset from a beach cabana.","latitude": "43.0434206","longitude": "16.1654725326047","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554937066756","city":"Zadar","country":"Croatia","photoDateTime": "2017-07-31T00:00:00.000+00:00","description":"Cool Roman museum","latitude": "44.1186078","longitude": "15.232136","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554937506762","city":"Pompeii","country":"Italy","photoDateTime": "2017-08-25T00:00:00.000+00:00","description":"Pompeii blew us away (too soon?)","latitude": "40.7509216","longitude": "14.4895620911152","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554937102276","city":"Plitvice","country":"Croatia","photoDateTime": "2017-08-01T00:00:00.000+00:00","description":"Waterfalls everywhere!","latitude": "44.85230125","longitude": "15.590348985344","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554937163003","city":"Zagreb","country":"Croatia","photoDateTime": "2017-08-03T00:00:00.000+00:00","description":"Quick stopover on the way to Budapest","latitude": "45.813177","longitude": "15.977048","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554937204372","city":"Budapest","country":"Hungary","photoDateTime": "2017-08-05T00:00:00.000+00:00","description":"Amazing dinner outside the city in a family's backyard.","latitude": "47.4983815","longitude": "19.0404707","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554937230891","city":"Vienna","country":"Austria","photoDateTime": "2017-08-07T00:00:00.000+00:00","description":"Unique and powerful Holocaust memorial.","latitude": "48.2083537","longitude": "16.3725042","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554937275559","city":"Venice","country":"Italy","photoDateTime": "2017-08-10T00:00:00.000+00:00","description":"The highlight of Venice was Venice.","latitude": "45.4371908","longitude": "12.3345898","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554937311925","city":"Florence","country":"Italy","photoDateTime": "2017-08-12T00:00:00.000+00:00","description":"Nostalgia for Mason's study abroad.","latitude": "43.7698712","longitude": "11.2555757","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554937411316","city":"Rome","country":"Italy","photoDateTime": "2017-08-20T00:00:00.000+00:00","description":"Cacio e pepe is life","latitude": "41.894802","longitude": "12.4853384","journeyId": journey.id},
      {"photoUrl":"https://my-photo-journey-prod.s3.us-west-1.amazonaws.com/1554937541882","city":"Barcelona","country":"Spain","photoDateTime": "2017-08-30T00:00:00.000+00:00","description":"The Sagrada Familia is stunning","latitude": "41.3828939","longitude": "2.1774322","journeyId": journey.id}
    ]);
  });   