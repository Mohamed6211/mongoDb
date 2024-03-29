
console.log("aaa")
function authenticate() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Send username, password, and QR code data to server for authentication
    // Implement server-side logic to verify the credentials and QR code data
  }

  

// Function to handle file selection
function handleFileSelect(event) {
const file = event.target.files[0]; // Get the selected file

if (file) {
  // Create a FileReader to read the file contents
  const reader = new FileReader();

  // Set up the FileReader to handle the file load event
  reader.onload = function(e) {
    const qrCodeImage = new Image();
    qrCodeImage.onload = function() {
      // Decode the QR code image
      const codeData = decodeQRCode(qrCodeImage);
      if (codeData) {
        console.log("QR code decoded successfully:", codeData.data);
        // Use codeData.data to access the decoded text data from the QR code
      } else {
        console.log("Unable to decode QR code");
      }
    };

    // Set the source of the image to the loaded file data
    qrCodeImage.src = e.target.result;
  };

  // Read the file as a data URL
  reader.readAsDataURL(file);
}
}

// Function to decode QR code image
function decodeQRCode(qrCodeImage) {
const qrCodeCanvas = document.createElement('canvas');
const qrCodeCanvasContext = qrCodeCanvas.getContext('2d');

qrCodeCanvas.width = qrCodeImage.width;
qrCodeCanvas.height = qrCodeImage.height;

qrCodeCanvasContext.drawImage(qrCodeImage, 0, 0, qrCodeImage.width, qrCodeImage.height);

const imageData = qrCodeCanvasContext.getImageData(0, 0, qrCodeImage.width, qrCodeImage.height);
const codeData = jsQR(imageData.data, imageData.width, imageData.height);
return codeData;
}

function startQRCodeScanner() {
const videoElement = document.getElementById('qrCodeScanner');

// Check if getUserMedia is supported
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Request access to the camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      // Display the camera stream in the video element
      videoElement.srcObject = stream;
      videoElement.play();

      // Wait for the video metadata to be loaded
      videoElement.addEventListener('loadedmetadata', function() {
        // Start decoding the QR code from the video stream
        decodeQRCodeFromStream(videoElement);
      });
    })
    .catch(function(error) {
      console.error('Error accessing camera:', error);
    });
} else {
  console.error('getUserMedia is not supported');
}
}

// Function to decode the QR code from the video stream
function decodeQRCodeFromStream(videoElement) {
// Create a canvas element to capture the video frame
const canvasElement = document.createElement('canvas');
const canvasContext = canvasElement.getContext('2d');

// Set the canvas dimensions to match the video frame size
canvasElement.width = videoElement.videoWidth;
canvasElement.height = videoElement.videoHeight;

// Check for a QR code in each video frame
function scanVideoFrame() {
  canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
  const codeData = jsQR(imageData.data, imageData.width, imageData.height);

  if (codeData) {
    // QR code found, stop scanning and handle the decoded data
    console.log("QR code decoded successfully:", codeData.data);
    stopQRCodeScanner();
  } else {
    // No QR code found, continue scanning
    requestAnimationFrame(scanVideoFrame);
  }
}

// Start scanning video frames for QR codes
scanVideoFrame();
}

// Function to stop scanning the QR code
function stopQRCodeScanner() {
// Stop the camera stream
const videoElement = document.getElementById('qrCodeScanner');
const stream = videoElement.srcObject;
if (stream) {
  const tracks = stream.getTracks();
  tracks.forEach(function(track) {
    track.stop();
  });
  videoElement.srcObject = null;
}
}

// Start scanning the QR code when the page loads
// startQRCodeScanner();



function generateQRCode(text) {
// Create a QRCode object with the desired text content
const qr = qrcode(0, 'L');
qr.addData(text);
qr.make();

// Get the QR code SVG string
const svgString = qr.createSvgTag();

// Create a new Image object and set its src to the SVG string
const image = new Image();
image.onload = function() {
  // Create a new canvas element
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Set canvas dimensions to match the image dimensions
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw the image onto the canvas
  context.drawImage(image, 0, 0);

  // Convert canvas to data URL (PNG format)
  const pngDataUrl = canvas.toDataURL('image/png');

  // Create a download link for the PNG image
  const link = document.createElement('a');
  link.href = pngDataUrl;
  link.download = 'qrcode.png'; // Set the filename for the downloaded image
  link.textContent = 'Download QR Code';
  document.body.appendChild(link);
};

// Set the Image src to trigger the onload event
image.src = 'data:image/svg+xml;base64,' + btoa(svgString);
}




