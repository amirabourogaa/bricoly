const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

// importing users' table's model
var users = db.import('../database/models/users.js');

exports.signUp = async (req, res) => {
    console.log(req.body);
    // TODO - add req body paramter validation IMPORTANT !!!
    
    try{
        // generate salt
        var salt = await bcrypt.genSalt(10);
        var hashedPass =  await bcrypt.hash(req.body.password, salt);
        db.sync({force:false})
        // hash password
        // sync database
        .then(() => {
            // create new user
            return users.create({ 
                first_name :req.body.firstName, 
                last_name: req.body.lastName,
                email:req.body.email,
                phone:req.body.phone,
                is_professional:false 
            });
        })
        .then(user => {
            return user.save();
        })
        .then(savedRow => {
            const { id, email } = savedRow;
            const token = jwt.sign({id, email}, process.env.ACCESS_TOKEN_SECRET);   
            res.json({id, email, accessToken:token});
        })
        .catch
    }
    catch(e){ 
        console.log(e);
    }     
    
    // save new user to database
    // send user id, email & token back to front end
}