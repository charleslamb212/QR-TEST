function generateQRCode() {
  const inputText = document.getElementById("inputText").value;

  // Check if the user entered some text
  if (inputText.trim() === "") {
    alert("Please enter some text or URL to generate the QR code.");
    return;
  }

  // Generate QR code
  const qrcodeDiv = document.getElementById("qrcode");
  qrcodeDiv.innerHTML = "";

  const qrcode = new QRCode(qrcodeDiv, {
    text: inputText,
    width: 256,
    height: 256,
    margin: 0.5,
  });
}

function toggleMenu() {
  var navItems = document.getElementById("navItems");
  if (navItems.style.display === "flex") {
    navItems.style.display = "none";
  } else {
    navItems.style.display = "flex";
  }
}
