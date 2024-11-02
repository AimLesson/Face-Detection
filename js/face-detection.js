// List of quotes
const quotes = [
  "Believe in yourself!",
  "Stay positive, work hard, make it happen.",
  "Dream big and dare to fail.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Keep going. Everything you need will come to you at the perfect time."
];

// Function to get a random quote
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Initialize face detection
const webcamElement = document.getElementById("webcam");
const webcam = new Webcam(webcamElement, "user");
let faceDetection;
let canvas;
let displaySize = { width: 640, height: 480 };

// Start detection when the checkbox is toggled
$("#webcam-switch").change(function () {
  if (this.checked) {
    webcam.start()
      .then(() => {
        startDetection();
      })
      .catch(displayError);
  } else {
    stopDetection();
    webcam.stop();
  }
});

// Start face detection
function startDetection() {
  faceDetection = setInterval(async () => {
    const detections = await faceapi.detectAllFaces(webcamElement, new faceapi.TinyFaceDetectorOptions());
    if (detections.length > 0) {
      console.log("Face detected!");
      $("#quoteContent").text(getRandomQuote());
      setTimeout(() => {
        $("#quoteModal").modal("show");
      }, 500); // Small delay for stability
    }
  }, 300);
}

// Stop face detection
function stopDetection() {
  clearInterval(faceDetection);
}

// Error handling
function displayError(err = "") {
  $("#errorMsg").html(err).removeClass("d-none");
}
