// import bins from './public/bins.json' with {type: json}
const bins = require("./public/bins.json");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

// initialize the app
const app = express();

// create a server
const server = http.createServer(app);

// initialize socket io on the server
const io = socketIo(server);

// serving static files
app.use(express.static(path.join(__dirname, "public")));

// handling connection events
io.on("connection", (socket) => {
  console.log("a new user has connected!");

  // handling incoming messages as long as the client is connected
  socket.on("message", (msg) => {
    console.log(`Bin id: ${msg} `);
  });

  // // listining for bin Id from the client
    socket.on("binID", (id) => {
        console.log(`BindId from frontend Client: ${id}`);
        var msg = "yo yo yo "
        var msg1 = JSON.stringify(msg)
        // sending messgaes to the client
        // for zixflow api
        const options = {
            method: "POST",
            headers: {
                Authorization:
                    "Bearer e379a57ea5a2a226e5683da6e0fe9eb078b18d6ae54eb79a00b0ff5f66681a39ddf3bb136b3da2ce",
                "Content-Type": "application/json",
            },
            body: '{"to":"916002293409","phoneId":"231065823421330","type":"text","text":{"preview_url":true,"body":""},"source":"","linkWithRecord":"false","submissionStatus":true}',
        };

        bins.Dimapur.forEach((driver) => {
            if (id === driver[2]) {
              var text = `Notice from SGDMS\nName: ${driver[4]}\nBinid:${driver[2]}\nLocation: ${driver[1]}GoogleLink : ${driver[6]}`;
              let bodyObject = JSON.parse(options.body);
              bodyObject.text.body = text;
              options.body = JSON.stringify(bodyObject);
            }
        })
    fetch(
      "https://api.zixflow.com/api/v1/campaign/whatsapp/message/send",
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    // console.log(bins.Dimapur)
  });

  // handling disconnects
  socket.on("disconnect", () => {
    console.log("The user has disconnected!!");
  });
});

// setting basic routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/bins", (req, res) => {
  res.sendFile(path.join(__dirname, "public/bins.html"));
});

//starting the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log("Express server running at PORT: 8000");
});
