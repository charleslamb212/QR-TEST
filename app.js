// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
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

const wifiForm = document.getElementById("wifiForm");
const qrcodeDiv = document.getElementById("qrcode");

wifiForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const ssid = document.getElementById("ssid").value.trim();
  const password = document.getElementById("password").value.trim();
  const security = document.getElementById("security").value.trim();

  // Validate the input and handle errors
  // ...

  try {
    const response = await fetch("/generateQRCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ssid, password, security }),
    });

    if (response.ok) {
      const data = await response.json();
      const qrCodeUrl = data.qrCodeUrl;
      qrcodeDiv.innerHTML = `<img src="${qrCodeUrl}" alt="Wi-Fi QR Code">`;
    } else {
      console.error("Error generating QR code:", response.status);
      qrcodeDiv.innerHTML = "<p>Error generating QR code.</p>";
    }
  } catch (err) {
    console.error("Error generating QR code:", err);
    qrcodeDiv.innerHTML = "<p>Error generating QR code.</p>";
  }
});
