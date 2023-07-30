const express = require("express");
const qrcode = require("qrcode");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());

// Define a route for serving the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//API enpoint to generate QR code
app.post("/generateQRCode", async (req, res) => {
  const { ssid, password, security } = req.body;

  // Generate the Wi-Fi configuration string
  const wifiConfig = `WIFI:T:${security};S:${ssid};P:${password};;`;

  try {
    const qrCodeUrl = await qrcode.toDataURL(wifiConfig);
    res.json({ qrCodeUrl });
  } catch (err) {
    console.error("Error generating QR code:", err);
    res.status(500).json({ error: "Error generating QR code" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
