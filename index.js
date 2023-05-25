const axios = require("axios")
require('dotenv').config()


module.exports.handler = async (event) => {
  // Make an HTTP request to NASA api
  // const {
  //   NASA_API_KEY
  // } = process.env;

  // JSON response stored in imageData
  const { data: imageData } = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
  );

  // Text message body, using data from Nasa JASON
  const body = `
  --${imageData.date}--
  Good Morning! 
  Today's image from space is
  -------
  "${imageData.title}"
  -------
  ${imageData.explanation} 
  `;

  // Instantiating Twilio Client
  const accountSid=process.env.TWILIO_ACCOUNT_SID;
  const authToken=process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken)

  await client.messages.create({
    body,
    mediaUrl: [imageData.url],
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.MY_PHONE_NUMBER,
  });
  console.log("Text sent")

  
};
