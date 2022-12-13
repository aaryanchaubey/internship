const jwt = require('jsonwebtoken');

const auths = (req, res, next) => {
    
    console.log('Cookies', req.cookies);
    const token = req.cookies.jwt;
    console.log('Token', token);

    if(token){
        jwt.verify(token, 'yoga-secret', (err, decodedToken) => {
            if(err) {
                res.redirect('/api/login');
            }
            else{
                next();
            }
        })
    }
    else{
        res.redirect('/api/login');
    }
}

module.exports = {auths};