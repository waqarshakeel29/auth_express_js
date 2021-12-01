const router = require('express').Router();
const User = require('../models/user');
const validation = require('../helper/validation');
var bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {
    try{
        // Validate Data from user
        await validation.registerValidation(req.body);

        // Check if user already exist
        const isAlreadyExist = await User.findOne({email:req.body.email});
        if(isAlreadyExist) return res.status(400).send("Email Already Exist");

        // Convert Password into Hash
        var passwordHash = await bcrypt.genSalt(10)
        .then((salt => bcrypt.hash(req.body.password, salt)))
        .then(hash => hash);

        // Create User object to save in DB
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: passwordHash
        });
        const savedUser = await user.save();

        // Return Created User Object
        res.send(savedUser);
    }catch(e){
        res.status(400).send(e);
    }
});


router.post('/login', async (req, res) => {
    try{
        // Validate Data from user
        await validation.loginValidation(req.body);

        // check if email exist
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send("Email or Password is Wrong");

        // compare the password
        const passValid = await bcrypt.compare(req.body.password, user.password);
        if(!passValid) return res.status(400).send("Invalid Password");

        res.send(user);

    }catch(e){
        res.status(400).send(e);
    }
});


module.exports = router;