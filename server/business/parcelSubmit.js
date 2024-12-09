const jwt = require('jsonwebtoken');
const Parcel = require('../schema/parcel'); // Adjust the path as necessary

const ParcelSubmit = async (req, res) => {
  const { parcelDescription } = req.body;
  const token = req.cookies.authToken; // Assuming JWT token is stored in a cookie named 'authToken'

  // Secret key for JWT decoding - ensure this is kept safe and secure
  const secretKey = 'your_jwt_secret_key'; // Replace with your actual secret key

  try {
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Decode the JWT token
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId; // Extract the user ID from the token

    // Check if a parcel entry exists for the userId
    let parcel = await Parcel.findOne({ userId });

    if (parcel) {
      // Update existing parcel entry
      parcel.parcelDescription = parcelDescription;
      await parcel.save();
      res.status(200).json({ message: 'Parcel description updated successfully!' });
    } else {
      // Create a new parcel entry
      const newParcel = new Parcel({
        userId,
        parcelDescription,
      });
      await newParcel.save();
      res.status(200).json({ message: 'Parcel description submitted successfully!' });
    }
  } catch (error) {
    console.error('Error processing parcel description:', error);
    res.status(500).json({ message: 'An error occurred while processing the parcel description.' });
  }
};

module.exports = ParcelSubmit;
