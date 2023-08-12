document.addEventListener("DOMContentLoaded", () => {
  const wifiForm = document.getElementById("wifi-form");
  const qrContainer = document.getElementById("qr-container");

  wifiForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const ssid = event.target.ssid.value;
    const password = event.target.password.value;

    const response = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ssid, password }),
    });

    const qrCodeHTML = await response.text();
    qrContainer.innerHTML = qrCodeHTML;

    qrContainer.classList.add("show");

    // Add the download button dynamically
    const qrImage = qrContainer.querySelector("img");
    const downloadButton = document.createElement("button");
    downloadButton.id = "download-btn";
    downloadButton.className = "btn btn-secondary";
    downloadButton.textContent = "Download QR Code";
    qrContainer.appendChild(downloadButton);

    // Add event listener to the download button
    downloadButton.addEventListener("click", () => {
      const downloadLink = document.createElement("a");
      downloadLink.href = qrImage.src;
      downloadLink.download = "wifi_qr_code.png";
      downloadLink.click();
    });
  });
});
