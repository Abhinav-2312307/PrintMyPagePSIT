// server.js
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();
const upload = multer({ dest: 'uploads/' });

// Connect to MongoDB
mongoose.connect('mongodb://localhost/printmypage', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create Order Schema
const orderSchema = new mongoose.Schema({
  name: String,
  className: String,
  section: String,
  year: Number,
  rollNumber: String,
  fileName: String,
  filePath: String,
  printType: String,
  timestamp: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

app.use(express.json());
app.use(express.static('public'));

// Handle form submission
app.post('/submit-order', upload.single('file'), async (req, res) => {
  try {
    const newOrder = new Order({
      name: req.body.name,
      className: req.body.class,
      section: req.body.section,
      year: req.body.year,
      rollNumber: req.body.rollNumber,
      fileName: req.file.originalname,
      filePath: req.file.path,
      printType: req.body.printType
    });

    await newOrder.save();
    res.status(200).json({ message: 'Order placed successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));