const webcamElement = document.getElementById('webcam');
const webcam = new Webcam(webcamElement, 'user');
const modelPath = 'models';
let displaySize;
let canvas;
let faceDetection;
const quotes = [
    "Believe in yourself!",
    "You're doing great!",
    "Keep smiling!",
    "Stay positive!",
    "You are capable of amazing things!"
];

// Automatically start the webcam and face detection on load
$(document).ready(function () {
    startWebcamAndDetection();
});

function startWebcamAndDetection() {
    webcam.start()
        .then(() => {
            cameraStarted();
            return loadFaceDetectionModel();
        })
        .catch(err => displayError());
}

async function loadFaceDetectionModel() {
    $(".loading").removeClass('d-none');
    await faceapi.nets.tinyFaceDetector.load(modelPath);
    $(".loading").addClass('d-none');
    createCanvas();
    startDetection();
}

function createCanvas() {
    if (!document.querySelector("canvas")) {
        canvas = faceapi.createCanvasFromMedia(webcamElement);
        document.getElementById('webcam-container').append(canvas);
        faceapi.matchDimensions(canvas, displaySize);
    }
}

function startDetection() {
    faceDetection = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(webcamElement, new faceapi.TinyFaceDetectorOptions());
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        if (detections.length > 0) {
            faceapi.draw.drawDetections(canvas, resizedDetections);
            showQuote();
        } else {
            $("#quoteMsg").addClass("d-none");
        }
    }, 300);
}

function showQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    $("#quoteText").text(randomQuote);
    $("#quoteMsg").removeClass("d-none");
}

function cameraStarted() {
    $("#errorMsg").addClass("d-none");
}

function displayError() {
    $("#errorMsg").removeClass("d-none");
}
