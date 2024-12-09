const Location = require('../schema/location');

const getLocation = async (req, res) => {
    try {
        // Query the database for all locations
        const locations = await Location.find({});
        
        if (locations.length > 0) {
            res.status(200).json({ data: locations });
        } else {
            res.status(404).json({ message: 'No locations found' });
        }
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getLocation;
