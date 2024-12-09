
const cookieParser = require('cookie-parser');
const Getcookies=(req,res)=>{
    const cookieValue = req.cookies['authToken'];
    res.json({ cookieValue });  
}
module.exports=Getcookies