const Location = require('../schema/location');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const saveLocation = async (req, res) => {
    const cookieValue = req.cookies['authToken'];
    const { latitude, longitude } = req.body;
    const token = cookieValue;
    const secret = 'your_jwt_secret_key';
    
    try {
        // Verify the token
        const decoded = jwt.verify(token, secret);
        const userId = decoded.userId;

        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ message: 'Invalid data' });
        }

        try {
            // Find and update or create a new location
            const updatedLocation = await Location.findOneAndUpdate(
                { userId }, // Filter: find location by userId
                { latitude, longitude }, // Update: set latitude and longitude
                { new: true, upsert: true, runValidators: true } // Options: return updated doc, create if not exists, run schema validators
            );

            res.status(200).json({ message: 'Location saved or updated successfully', data: updatedLocation });
        } catch (error) {
            console.error('Error saving or updating location:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

    } catch (error) {
        console.error('Failed to verify token:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = saveLocation;
