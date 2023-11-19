const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const { firstName, lastName } = req.body;
    const userName = `${firstName}_${lastName}`;
    cb(null, `${userName}-img-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files (HTML, CSS, images, etc.)
app.use(express.static(__dirname));

// Render the index.ejs file
app.get('/', function (req, res) {
  const uploadedImages = getUploadedImages();
  res.render('index', { uploadedImages });
});

// Handle form submissions
app.post('/submit', upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), function (req, res) {
  const uploadedImages = getUploadedImages();
  res.render('index', { uploadedImages });
});

// Function to read uploaded images from the directory
function getUploadedImages() {
  return fs.readdirSync('uploads').filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'));
}

// Start the server
const port = 5500;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
