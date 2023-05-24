require('dotenv').config()

const accountSid=process.env.TWILIO_ACCOUNT_SID;
const authToken=process.env.TWILIO_AUTH_TOKEN;
const client=require('twilio')(accountSid, authToken)


client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: "My Name Is Marcel And I'm Partially A Shell, as you can see, on my body, but I also have shoes and um a face, so, I like that about myself. And I like myself and I have a lot of other great qualities as well"
})
.then((message)=>console.log('Message SID: ' + message.sid))