const config = require('config');
const jwt = require('jsonwebtoken');

function auth(request, response, next) {
    const token = request.header('x-auth-token');

    // Check for token
    if(!token){
        return response.status(401).json({success: false, msg: 'No token, authorization denied'});    
    }

    try {
        // Verify token
        const decoded = jwt.verify (token, config.get('jwtSecret'));
        // Add User from payload
        request.user = decoded;
        next();
    } catch (exception) {
        response.status(500).json({success: false, msg: 'Token is not valid: ' + exception});  
    }

    
}

module.exports = auth;