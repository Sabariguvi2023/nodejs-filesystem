const fs = require("fs");
const express = require("express");


const exp = express();

const timestamp = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const time = `${hours}:${minutes}:${seconds}`;
  return time;
};

exp.get("/", (req, res) => {
  // Link the external stylesheet
  res.send(`
      <html>
      <head>
         <link rel="stylesheet" type="text/css" href="/style.css">
      </head>
      <body class="welcome">
         <h1>Welcome to this page 😊</h1>
         <img src="https://media.tenor.com/Fj5pGbDTAjkAAAAM/clock-time.gif" alt="time" class="time2">

         <p>To know the current time.<span> ADD "/time" to the URL</span></p>
      </body>
      </html>
   `);
});

exp.get("/time", (req, res) => {
  console.log("timestamp is working fine");
  res.end(`
      <html>
      <head>
         <link rel="stylesheet" type="text/css" href="/style.css">
      </head>
      <body class="time">
         <h2 class="custom-heading">Current time is 🕓${timestamp()}</h2>
      </body>
      </html>
   `);
});

fs.readdir("./Date and time", (error, files) => {
  if (error) {
    console.log("Error Occurred!!", error);
  } else {
    console.log("folder read succesfully", files);
  }
});

exp.use(express.static("public"));

fs.writeFile("./Date and time/Current Date-Time.txt", timestamp(), (error) => {
  if (error) {
    console.log("Error Occurred!!", error);
  } else {
    console.log("Timestamp written to file successfully.");
  }
});

exp.listen(5000, () => console.log("Server is running 5000"));