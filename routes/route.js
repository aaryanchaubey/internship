const express =require('express');
const router = express.Router();
const customerController = require('../controller/customerController');
const {auths} = require('../middleware/auth');

router.post('/register', customerController.addCustomer);
router.post('/login', customerController.login);
router.get('/logout', customerController.logout);
router.get('/dashboard', auths, customerController.goToDashboard);
router.post('/dashboard', auths, customerController.updateCustomer);

router.get('/register', (req, res) => { res.render('register') })
router.get('/login', (req, res) => { res.render('login') })

module.exports = router;