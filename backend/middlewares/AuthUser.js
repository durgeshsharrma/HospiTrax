const jwt = require('jsonwebtoken');
module.exports.authUser = async (req, res, next) => {
    try {
         const authHeader = req.headers.authorization;
                
        
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    return res.status(401).json({ message: 'Unauthorized access' });
                }
        
                const token = authHeader.split(' ')[1]; // Extract token after "Bearer"
        
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
                next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(403).json({ message: 'Forbidden access' });
    }
};