
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_SDK)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const verifyAdmin = async (req, res, next) => {
    if (req.headers?.token) {
        const token = req.headers.token.split(' ')[1];

        try {
            const decodedUser = await admin.auth().verifyIdToken(token);
            req.user = decodedUser;
            next();
        } catch (error) {
            res.status(403).json({ message: 'Invalid Token Provided' })
        }
    }


}

module.exports = verifyAdmin;