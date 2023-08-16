// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.get("/api", function(req, res) {
const now = new Date()
    const unixTimestamp = now.getTime()
    const utcTime = now.toUTCString()
    return res.json({
      "unix": unixTimestamp,
      "utc": utcTime
    })
});

app.get("/api/:date", function(req, res) {
  let data = req.params.date;
  let temp = data.split("-");
  let temp2 = data.split(" ");
  if (temp.length > 1 || temp2.length > 1) {
    console.log(temp);

    const now = new Date(data)
    // Get the Unix timestamp in seconds
    const unixTimestamp = now.getTime();

    // Get the UTC time
    let utcTime = now.toUTCString();
    if (utcTime == "Invalid Date") {
      res.json({ error: "Invalid Date" })
      return;
    }
    res.json({
      "unix": unixTimestamp,
      "utc": utcTime
    })

  } else {
    console.log(data);
    // Get the UTC time from the Unix timestamp
    // console.log(typeof(data))
    // let utcTime = new Date(Number(data)).toUTCString()
    res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
  }

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
