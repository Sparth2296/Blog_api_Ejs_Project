
const userModel = require('../model/userModel');
const bcrypt = require('bcrypt'); 


module.exports.register = (req, res) => {
    res.render('register');
}

module.exports.UserRegister = async (req, res) => {
    try {


        const { username, email, password } = req.body;


        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User with this email already exists');
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({ username, email, password: hashPassword });


        res.cookie('userId', user._id);

    
        res.redirect('/home');



    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.login = (req, res) => {
    res.render('login');
}

module.exports.UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.status(400).render('/').send('Invalid email or password');
        }       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).render('/login').send('Invalid email or password');
        }   
       
        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('userId');
    res.redirect('/login');
}