const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');  // Read token from header
    console.log("Received Token:", token);  // Debugging log

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const tokenParts = token.split(" "); // Split "Bearer <token>"
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({ error: 'Invalid token format' });
        }

        const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
        req.userId = decoded.id;
        console.log(decoded.id)
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken;
