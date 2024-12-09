// // const express = require('express');
// // const router = express.Router();
// // const signup=require('../business/signup')
// // const signup_v=require('../validator/signup_v')
// // const signup_m=require('../middleware/signup_m')
// // const login_v=require('../validator/login_v');
// // const login_m=require('../middleware/login_m');
// // const login=require('../business/login')
// // const Getcookies=require('../business/Getcookies')
// // const tokendecoder=require('../business/tokendecoder')
// // const saveloco=require('../business/saveLocation')
// // const getloco=require('../business/getLocation')
// // const ParcelSubmit=require('../business/parcelSubmit')
// // const mysql = require('mysql2/promise');
// // const request=require('../business/request')
// // const getinfo=require('../business/getinfo')
// // const acceptedclient=require('../business/acceptedclient')
// // const underservice=require('../business/underservice')
// // const youdguy=require('../business/yourdeliveryguy')
// // const puppy=require('../business/puppy')
// // const getrecloc=require('../business/getreceiverlocation')
// // const ends=require('../business/endservice')
// // const MyStatus=require('../schema/mystatus')
// // const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
// // const ReceiverLocationDetail=require('../schema/receiverlocationanddetail')
// // const user=require('../schema/signup')

// // router.post('/signup',signup_v,signup_m,signup)
// // router.post('/login',login_v,login_m,login)
// // router.get('/get-cookie',Getcookies)
// // router.post('/tokendecoder',tokendecoder)
// // router.post('/savelocation',saveloco)
// // router.get('/getlocation',getloco)
// // router.delete('/deleteLocation', (req, res) => {
// //     // Handle deleting location from database
// //     console.log('Location delete request received:', req.body);
// //     res.json({ message: 'Location deleted successfully' });
// //   });
// //   const SECRET_KEY = 'your_jwt_secret_key';
// // router.post('/submit-parcel',ParcelSubmit)
// // router.post('/acceptedclient',acceptedclient)
// // router.get('/Drequest',request)
// // router.get('/getinfo/:userId',getinfo)
// // router.get('/underservice',underservice)
// // router.get('/getmyguy',youdguy)
// // router.get('/puppy',puppy)
// // router.get('/endservice',ends)

// // // router.get('/merostatus', async (req, res) => {
// // //   try {
// // //     const token = req.cookies.authToken; // Make sure the cookie name matches
// // //     const decoded = jwt.verify(token, SECRET_KEY);
    
// // //     const customerId = decoded.userId; 
// // //     const statuses = await MyStatus.find({customerId}).populate('customerId deliveryId');
// // //     res.json(statuses);
// // //   } catch (err) {
// // //     res.status(500).json({ message: err.message });
// // //   }
// // // });


// // // Endpoint to get status
// // router.get('/merostatus', async (req, res) => {
// //   const db = mysql.createPool({
// //     host: 'localhost',
// //     user: 'root',
// //     password: '',
// //     database: 'goparcel',
// //   })
// //   try {
// //     const token = req.cookies.authToken; // Make sure the cookie name matches
// //     const decoded = jwt.verify(token, SECRET_KEY);
    
// //     const customerId = decoded.userId;

// //     // Use a JOIN to fetch related data
// //     const [statuses] = await db.query(`
// //     SELECT ms.*, c1.firstName AS customerFirstName, c1.lastName AS customerLastName,
// //              c2.firstName AS deliveryFirstName, c2.lastName AS deliveryLastName
// //       FROM MyStatus ms
// //       JOIN users c1 ON ms.customerId = c1.id
// //       JOIN users c2 ON ms.deliveryId = c2.id
// //       WHERE ms.customerId = ?
// //     `, [customerId]);

// //     res.json(statuses);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // router.get('/abc',getrecloc);



// // // DELETE delivery and update status

// // // router.post('/completed', async (req, res) => {
  
// // //   console.log(req.body);
  
  
// // //   // Retrieve the delivery token from cookies
// // //   const deliveryToken = req.cookies.authToken; // Make sure the cookie name matches
 

// // //   if (!deliveryToken) {
// // //     return res.status(400).json({ message: 'Delivery token not found in cookies' });
// // //   }

// // //   try {
// // //     // Decode the token to get the deliveryId
// // //     const decoded = jwt.verify(deliveryToken, SECRET_KEY);
    
// // //     const deliveryId = decoded.userId; // Adjust according to your token structure

// // //     // Find and delete the delivery
// // //     const delivery = await ReceiverLocationDetail.findOneAndDelete({ deliveryId });

// // //     if (!delivery) {
// // //       return res.status(404).json({ message: 'Delivery not found' });
// // //     }

// // //     // Update MyStatus collection
// // //     await MyStatus.findOneAndUpdate(
// // //       { _id:req.body.paras }, // Assuming you want to update based on deliveryId
// // //       { status: 'Completed' }, // Update status to 'deleted'
// // //       { new: true } // Return the updated document
// // //     );

// // //     return res.status(200).json({ message: 'Delivery deleted and status updated' });
// // //   } catch (error) {
// // //     console.error(error);
// // //     if (error.name === 'JsonWebTokenError') {
// // //       return res.status(401).json({ message: 'Invalid token' });
// // //     }
// // //     return res.status(500).json({ message: 'Server error' });
// // //   }
// // // });


// // // POST /completed
// // const db = mysql.createPool({
// //   host: 'localhost',
// //   user: 'root',
// //   password: '',
// //   database: 'goparcel',
// // })
// // router.post('/completed', async (req, res) => {
// //   console.log(req.body);
  
// //   // Retrieve the delivery token from cookies
// //   const deliveryToken = req.cookies.authToken; // Make sure the cookie name matches

// //   if (!deliveryToken) {
// //     return res.status(400).json({ message: 'Delivery token not found in cookies' });
// //   }

// //   try {
// //     // Decode the token to get the deliveryId
// //     const decoded = jwt.verify(deliveryToken, SECRET_KEY);
// //     const deliveryId = decoded.userId; // Adjust according to your token structure
// //     console.log(deliveryId);

// //     // Find and delete the delivery from ReceiverLocationDetail
// //     const [deliveryResults] = await db.query('DELETE FROM receiver_locations WHERE deliveryId = ?', [deliveryId]);

// //     if (deliveryResults.affectedRows === 0) {
// //       return res.status(404).json({ message: 'Delivery not found' });
// //     }

// //     // Update MyStatus collection
// //     const [statusResults] = await db.query(
// //       'UPDATE mystatus SET status = ? WHERE id = ?', 
// //       ['Completed', req.body.paras] // Assuming paras holds the status ID
// //     );

// //     if (statusResults.affectedRows === 0) {
// //       return res.status(404).json({ message: 'Status not found' });
// //     }

// //     return res.status(200).json({ message: 'Delivery deleted and status updated' });
// //   } catch (error) {
// //     console.error(error);
// //     if (error.name === 'JsonWebTokenError') {
// //       return res.status(401).json({ message: 'Invalid token' });
// //     }
// //     return res.status(500).json({ message: 'Server error' });
// //   }
// // });



// // // router.get('/getmyname',async(req,res)=>{
// // // try{
// // //   const token =req.cookies.authToken;
// // //   const decoded = jwt.verify(token, SECRET_KEY);
// // //     const idd = decoded.userId;

// // // try{
// // // const getdata= await user.findOne({_id:idd});
// // // console.log(getdata);
// // // res.send({
// // //   msg:getdata.firstName+' '+getdata.lastName
// // // })
// // // }catch(er){
// // //   console.log(er);
  
// // //   res.send({
// // //     msg:'welcome'
// // //   })
// // // }

// // // }catch(e){
  
// // //   res.send({
// // //     msg:'welcome'
// // //   })
// // // }
  
  
// // // })


// // router.get('/getmyname', async (req, res) => {
// //   // const SECRET_KEY = 'your_jwt_secret_key'; // Make sure to set your secret key
// // const dbConfig = {
// //   host: 'localhost',
// //   user: 'root',
// //   password: '',
// //   database: 'goparcel',
// // };

// //   try {
// //     const token = req.cookies.authToken;
// //     const decoded = jwt.verify(token, SECRET_KEY);
// //     console.log(decoded);
    
// //     const idd = decoded.userId;

// //     const connection = await mysql.createConnection(dbConfig);
    
// //     try {
// //       const [rows] = await connection.execute('SELECT firstName, lastName FROM users WHERE id = ?', [idd]);
      
// //       if (rows.length > 0) {
// //         const getdata = rows[0];
// //         res.send({
// //           msg: `${getdata.firstName} ${getdata.lastName}`,
// //         });
// //       } else {
// //         res.send({
// //           msg: 'User not found',
// //         });
// //       }
// //     } catch (er) {
// //       console.log(er);
// //       res.send({
// //         msg: 'Error retrieving user data',
// //       });
// //     } finally {
// //       await connection.end();
// //     }
// //   } catch (e) {
// //     console.log(e);
// //     res.send({
// //       msg: 'welcome',
// //     });
// //   }
// // });


// // app.get('/checkVerification', (req, res) => {
// //   const userId = req.query.userId; // Get user ID from query params or session
// //   const query = 'SELECT verify FROM users WHERE id = ?';

// //   db.query(query, [userId], (err, results) => {
// //       if (err) {
// //           return res.status(500).json({ error: 'Database query failed' });
// //       }
// //       if (results.length > 0) {
// //           res.json({ verify: results[0].verify });
// //       } else {
// //           res.json({ verify: null });
// //       }
// //   });
// // });


// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const signup = require('../business/signup');
// const signup_v = require('../validator/signup_v');
// const signup_m = require('../middleware/signup_m');
// const login_v = require('../validator/login_v');
// const login_m = require('../middleware/login_m');
// const login = require('../business/login');
// const Getcookies = require('../business/Getcookies');
// const tokendecoder = require('../business/tokendecoder');
// const saveloco = require('../business/saveLocation');
// const getloco = require('../business/getLocation');
// const ParcelSubmit = require('../business/parcelSubmit');
// const mysql = require('mysql2/promise');
// const request = require('../business/request');
// const getinfo = require('../business/getinfo');
// const acceptedclient = require('../business/acceptedclient');
// const underservice = require('../business/underservice');
// const youdguy = require('../business/yourdeliveryguy');
// const puppy = require('../business/puppy');
// const getrecloc = require('../business/getreceiverlocation');
// const ends = require('../business/endservice');
// const MyStatus = require('../schema/mystatus');
// const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
// const ReceiverLocationDetail = require('../schema/receiverlocationanddetail');
// const user = require('../schema/signup');

// router.post('/signup', signup_v, signup_m, signup);
// router.post('/login', login_v, login_m, login);
// router.get('/get-cookie', Getcookies);
// router.post('/tokendecoder', tokendecoder);
// router.post('/savelocation', saveloco);
// router.get('/getlocation', getloco);
// router.delete('/deleteLocation', (req, res) => {
//     // Handle deleting location from database
//     res.json({ message: 'Location deleted successfully' });
// });

// const SECRET_KEY = 'your_jwt_secret_key';
// router.post('/submit-parcel', ParcelSubmit);
// router.post('/acceptedclient', acceptedclient);
// router.get('/Drequest', request);
// router.get('/getinfo/:userId', getinfo);
// router.get('/underservice', underservice);
// router.get('/getmyguy', youdguy);
// router.get('/puppy', puppy);
// router.get('/endservice', ends);

// router.get('/merostatus', async (req, res) => {
//     const db = mysql.createPool({
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'goparcel',
//     });
//     try {
//         const token = req.cookies.authToken; // Make sure the cookie name matches
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const customerId = decoded.userId;

//         // Use a JOIN to fetch related data
//         const [statuses] = await db.query(`
//         SELECT ms.*, c1.firstName AS customerFirstName, c1.lastName AS customerLastName,
//                  c2.firstName AS deliveryFirstName, c2.lastName AS deliveryLastName
//           FROM MyStatus ms
//           JOIN users c1 ON ms.customerId = c1.id
//           JOIN users c2 ON ms.deliveryId = c2.id
//           WHERE ms.customerId = ?
//         `, [customerId]);

//         res.json(statuses);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// router.get('/abc', getrecloc);

// // POST /completed
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'goparcel',
// });
// router.post('/completed', async (req, res) => {
//     // Retrieve the delivery token from cookies
//     const deliveryToken = req.cookies.authToken; // Make sure the cookie name matches

//     if (!deliveryToken) {
//         return res.status(400).json({ message: 'Delivery token not found in cookies' });
//     }

//     try {
//         // Decode the token to get the deliveryId
//         const decoded = jwt.verify(deliveryToken, SECRET_KEY);
//         const deliveryId = decoded.userId; // Adjust according to your token structure

//         // Find and delete the delivery from ReceiverLocationDetail
//         const [deliveryResults] = await db.query('DELETE FROM receiver_locations WHERE deliveryId = ?', [deliveryId]);

//         if (deliveryResults.affectedRows === 0) {
//             return res.status(404).json({ message: 'Delivery not found' });
//         }

//         // Update MyStatus collection
//         const [statusResults] = await db.query(
//             'UPDATE mystatus SET status = ? WHERE id = ?', 
//             ['Completed', req.body.paras] // Assuming paras holds the status ID
//         );

//         if (statusResults.affectedRows === 0) {
//             return res.status(404).json({ message: 'Status not found' });
//         }

//         return res.status(200).json({ message: 'Delivery deleted and status updated' });
//     } catch (error) {
//         if (error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ message: 'Invalid token' });
//         }
//         return res.status(500).json({ message: 'Server error' });
//     }
// });

// router.get('/getmyname', async (req, res) => {
//     const dbConfig = {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'goparcel',
//     };

//     try {
//         const token = req.cookies.authToken;
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const idd = decoded.userId;

//         const connection = await mysql.createConnection(dbConfig);
        
//         try {
//             const [rows] = await connection.execute('SELECT firstName, lastName FROM users WHERE id = ?', [idd]);
            
//             if (rows.length > 0) {
//                 const getdata = rows[0];
//                 res.send({
//                     msg: `${getdata.firstName} ${getdata.lastName}`,
//                 });
//             } else {
//                 res.send({
//                     msg: 'User not found',
//                 });
//             }
//         } catch (er) {
//             res.send({
//                 msg: 'Error retrieving user data',
//             });
//         } finally {
//             await connection.end();
//         }
//     } catch (e) {
//         res.send({
//             msg: 'welcome',
//         });
//     }
// });



// const dbd = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'goparcel',
// });

// router.get('/checkVerification', async (req, res) => {
//   const userId = 2; 
//   const query = 'SELECT verify FROM users WHERE id = ?';
//   console.log('tttttttttttttttttttttttttttttttttttttttttttttt');


// try{
//   const [ker]= await dbd.query(query,[userId]);
//   console.log(ker[0].verify);
//   res.send({
//     verify:ker[0].verify
//   })

// }catch(err){
//   console.log('server error');
  
// }
    
//       // if (err) {
//       //     console.error('Database query error:', err); // Log the error
//       //     return res.status(500).json({ error: 'Database query failed' });
//       // }
//       // console.log(results);
      
//       // if (results.length > 0) {
//       //     res.json({ verify: results[0].verify });
//       // } else {
//       //     res.json({ verify: null });
//       // }
  
// });
  
       

// module.exports = router;





//new code






const express = require('express');
const router = express.Router();
const signup = require('../business/signup');
const signup_v = require('../validator/signup_v');
const signup_m = require('../middleware/signup_m');
const login_v = require('../validator/login_v');
const login_m = require('../middleware/login_m');
const login = require('../business/login');
const Getcookies = require('../business/Getcookies');
const tokendecoder = require('../business/tokendecoder');
const saveloco = require('../business/saveLocation');
const getloco = require('../business/getLocation');
const ParcelSubmit = require('../business/parcelSubmit');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const request = require('../business/request');
const getinfo = require('../business/getinfo');
const acceptedclient = require('../business/acceptedclient');
const underservice = require('../business/underservice');
const youdguy = require('../business/yourdeliveryguy');
const puppy = require('../business/puppy');
const getrecloc = require('../business/getreceiverlocation');
const ends = require('../business/endservice');
const MyStatus = require('../schema/mystatus');
const jwt = require('jsonwebtoken'); 
const ReceiverLocationDetail = require('../schema/receiverlocationanddetail');
const user = require('../schema/signup');

const getUserIdFromToken = (token) => {
    const decoded = jwt.verify(token, 'your_jwt_secret_key'); // Use your secret key
    return decoded.userId;
};


// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid duplicate names
    }
});

const upload = multer({ storage: storage });

// File upload endpoint
router.post('/upload-documents', upload.fields([{ name: 'frontCitizenship' }, { name: 'backCitizenship' }]), async (req, res) => {
    const frontFile = req.files['frontCitizenship'][0];
    const backFile = req.files['backCitizenship'][0];
    // const deliveryId = req.body.deliveryId; 
    const deliveryId = getUserIdFromToken(req.cookies.authToken);
    if (!frontFile || !backFile) {
        return res.status(400).send('Both files must be uploaded.');
    }

    const frontFilePath = path.join(__dirname, 'uploads', frontFile.filename);
    const backFilePath = path.join(__dirname, 'uploads', backFile.filename);

    const frontFilePathx = frontFile.filename;
    const backFilePathx = backFile.filename;

    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'goparcel',
    });

    try {
        const sql = 'INSERT INTO document_uploads (front_citizenship, back_citizenship, delivery_id) VALUES (?, ?, ?)';
        await db.query(sql, [frontFilePathx, backFilePathx, deliveryId]);
        res.send('Files uploaded and saved successfully!');
    } catch (error) {
        console.error('Error saving files to database:', error);
        res.status(500).send('Server error while saving files.');
    }
});



router.get('/document-uploads-check', async (req, res) => {
    const token = req.cookies.authToken; // Get the token from cookies
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const userId = getUserIdFromToken(token);
        const [rows] = await db.query('SELECT * FROM document_uploads WHERE delivery_id = ?', [userId]);

        res.json({ hasDocuments: rows.length > 0 });
    } catch (error) {
        console.error('Error checking documents:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Other existing routes
router.post('/signup', signup_v, signup_m, signup);
router.post('/login', login_v, login_m, login);
router.get('/get-cookie', Getcookies);
router.post('/tokendecoder', tokendecoder);
router.post('/savelocation', saveloco);
router.get('/getlocation', getloco);
router.delete('/deleteLocation', (req, res) => {
    res.json({ message: 'Location deleted successfully' });
});

const SECRET_KEY = 'your_jwt_secret_key';
router.post('/submit-parcel', ParcelSubmit);
router.post('/acceptedclient', acceptedclient);
router.get('/Drequest', request);
router.get('/getinfo/:userId', getinfo);
router.get('/underservice', underservice);
router.get('/getmyguy', youdguy);
router.get('/puppy', puppy);
router.get('/endservice', ends);

router.get('/merostatus', async (req, res) => {
    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'goparcel',
    });
    try {
        const token = req.cookies.authToken; // Make sure the cookie name matches
        const decoded = jwt.verify(token, SECRET_KEY);
        const customerId = decoded.userId;

        const [statuses] = await db.query(`
            SELECT ms.*, c1.firstName AS customerFirstName, c1.lastName AS customerLastName,
                   c2.firstName AS deliveryFirstName, c2.lastName AS deliveryLastName
            FROM MyStatus ms
            JOIN users c1 ON ms.customerId = c1.id
            JOIN users c2 ON ms.deliveryId = c2.id
            WHERE ms.customerId = ?
        `, [customerId]);

        res.json(statuses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/abc', getrecloc);

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'goparcel',
});
router.post('/completed', async (req, res) => {
    const deliveryToken = req.cookies.authToken;

    if (!deliveryToken) {
        return res.status(400).json({ message: 'Delivery token not found in cookies' });
    }

    try {
        const decoded = jwt.verify(deliveryToken, SECRET_KEY);
        const deliveryId = decoded.userId; // Adjust according to your token structure

        const [deliveryResults] = await db.query('DELETE FROM receiver_locations WHERE deliveryId = ?', [deliveryId]);

        if (deliveryResults.affectedRows === 0) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        const [statusResults] = await db.query(
            'UPDATE mystatus SET status = ? WHERE id = ?', 
            ['Completed', req.body.paras]
        );

        if (statusResults.affectedRows === 0) {
            return res.status(404).json({ message: 'Status not found' });
        }

        return res.status(200).json({ message: 'Delivery deleted and status updated' });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Server error' });
    }
});

router.get('/getmyname', async (req, res) => {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'goparcel',
    };

    try {
        const token = req.cookies.authToken;
        const decoded = jwt.verify(token, SECRET_KEY);
        const idd = decoded.userId;

        const connection = await mysql.createConnection(dbConfig);
        
        try {
            const [rows] = await connection.execute('SELECT firstName, lastName FROM users WHERE id = ?', [idd]);
            
            if (rows.length > 0) {
                const getdata = rows[0];
                res.send({
                    msg: `${getdata.firstName} ${getdata.lastName}`,
                });
            } else {
                res.send({
                    msg: 'User not found',
                });
            }
        } catch (er) {
            res.send({
                msg: 'Error retrieving user data',
            });
        } finally {
            await connection.end();
        }
    } catch (e) {
        res.send({
            msg: 'welcome',
        });
    }
});

router.get('/checkVerification', async (req, res) => {
    
    const query = 'SELECT verify FROM users WHERE id = ?';
    const userId = getUserIdFromToken(req.cookies.authToken);

    try {
        const [ker] = await db.query(query, [userId]);
        res.send({
            verify: ker[0].verify
        });
    } catch (err) {
        console.log('server error');
        res.status(500).send('Error checking verification status');
    }
});

module.exports = router;






