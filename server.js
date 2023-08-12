const express = require("express");
const qrcode = require("qrcode");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/generate", (req, res) => {
  const { ssid, password } = req.body;
  const wifiConfig = `WIFI:T:WPA;S:${ssid};P:${password};;`;

  qrcode.toDataURL(wifiConfig, (err, qrData) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    res.send(`<img src="${qrData}" alt="WiFi QR Code"/>`);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
