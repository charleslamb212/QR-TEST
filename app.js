const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// end express setup
// function generateQRCode() {
//   const inputText = document.getElementById("inputText").value;

//    Check if the user entered some text
//   if (inputText.trim() === "") {
//     alert("Please enter some text or URL to generate the QR code.");
//     return;
//   }

//    Generate QR code
//   const qrcodeDiv = document.getElementById("qrcode");
//   qrcodeDiv.innerHTML = "";

//   const qrcode = new QRCode(qrcodeDiv, {
//     text: inputText,
//     width: 256,
//     height: 256,
//     margin: 0.5,
//   });
// }

// function toggleMenu() {
//   var navItems = document.getElementById("navItems");
//   if (navItems.style.display === "flex") {
//     navItems.style.display = "none";
//   } else {
//     navItems.style.display = "flex";
//   }
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint to generate QR code
app.post("/generateQRCode", (req, res) => {
  const { ssid, password, security } = req.body;

  // Replace these placeholder values with your actual Wi-Fi credentials
  const wifiCredentials = {
    ssid: "Your_Wi-Fi_SSID",
    password: "Your_Wi-Fi_Password",
    security: "WPA/WPA2", // Security type (e.g., WEP, WPA, WPA2)
  };

  // Validate the input and handle errors
  // ...

  // Create the Wi-Fi login string
  const wifiLoginString = `WIFI:T:${wifiCredentials.ssid};S:${wifiCredentials.password};P:${wifiCredentials.security};`;

  // Generate QR code
  QRCode.toDataURL(wifiLoginString, (err, url) => {
    if (err) {
      console.error("Error generating QR code:", err);
      res.status(500).json({ error: "Error generating QR code" });
    } else {
      res.json({ qrCodeUrl: url });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
