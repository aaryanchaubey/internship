const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Customer = require('../models/customer');
const Batch = require('../models/batch')
const Fees = require('../models/Fees')

const maxAge = 30*24*60*60;

const addCustomer = async (req, res) => {

    console.log('Body', req.body);

    try {
        const {
          name, 
          email,
          password,
          age,
          batch
        } = req.body;

        const isCustomerExist = await Customer.find({ email: email })

        if (isCustomerExist.length) 
            return res.json({ "status": "failure", "msg": "Customer already exists!" });

        if (age < 18 || age > 65) 
            return res.json({ "status": "failure"});

        if (!name || !email || !password || !age || !batch) {
           return res.json({ "status": "failure", "msg": "Please send all required variables!" });
        }
        
        req.body.password = await bcrypt.hash(password, 10);
        const customer = await Customer.create(req.body);
    
        if (customer) res.redirect('/api/login');
        else res.redirect('/api/register');
     }

     catch (e) {
        console.log(e);
        res.status(500).json({ "status": "failure", "msg": e });
     }
}

const updateCustomer = async (req, res) => {
    
    const { batch } = req.body;
    const decoded = await jwt.verify(req.cookies.jwt, 'yoga-secret');
    let data = await Customer.find({ email: decoded.email });
    let email = data[0].email;
    
    try {
        const isCustomerExist = await Customer.find({ email: email });
        if (isCustomerExist) {
            const isUpdated = await Customer.update(
                {email: email},
                {
                    $set: {
                        batch: batch
                    }
                } 
            )
            res.redirect('/api/dashboard')
        }
    }
    catch (err) {
        console.error(err);
    }
}

const login = async (req, res) => {
    
    try {
        let { email, password } = req.body;
        const isCustomerExists = await Customer.find({ email: email });
        
        if (isCustomerExists) {
           const is_match = await bcrypt.compare(password, isCustomerExists[0].password);
           if (is_match) {
                const token = await jwt.sign({ email }, 'yoga-secret', { expiresIn: '30d' });     
                res.cookie('jwt', token, {maxAge: maxAge * 1000});
                res.redirect('/api/dashboard');
           }
           else
              res.json({ "status": "failure", "msg": "Email or Password wrong" });
        }
        else
           res.json({ "status": "failure", "msg": "Customer does not exists" });
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ "error": err });
    }
}

const goToDashboard = async (req, res) => {

    try {
        const decoded = await jwt.verify(req.cookies.jwt, 'yoga-secret');
        let data = await Customer.find({ email: decoded.email });
        
        const todayDate = new Date().getDate();
        const totaldays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
        const remainingDays = totaldays - todayDate;

        res.render('dashboard', {data: data, remainingDays: remainingDays});
     }
     catch (err) {
        console.log(err);
        res.status(500).json({
           status: "failure",
           msg: "invalid credentials"
        });
     }

}

const logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/api/login');
}

module.exports = {
    addCustomer,
    updateCustomer,
    login,
    logout,
    goToDashboard
};