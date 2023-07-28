const express = require("express");
const QRCode = require("qrcode");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint to generate QR code
app.post("/generateQRCode", (req, res) => {
  const { ssid, password, security } = req.body;

  // Validate the input and handle errors
  // ...

  // Create the Wi-Fi login string
  const wifiLoginString = `WIFI:T:${ssid};S:${password};P:${security};`;

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
