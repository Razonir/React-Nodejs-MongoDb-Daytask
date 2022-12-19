const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user')
const { sendMails } = require('../services/email-sender')


exports.login = async (req, res, next) => {
    console.log('login');
    try {
        const body = req.body;
        const email = body?.email;
        const password = body?.password;
        if (email == null) {
            res.status(400).send({ message: "Missing email" });
            return;
        }
        if (password == null) {
            res.status(400).send({ message: "Missing password" });
            return;
        }
        let user = await userModel.findOne({ email: email, password: password });
        if (!user) {
            return res
                .status(400)
                .send({ message: `אימייל או סיסמא לא נכונים` });
        } else {
            const token = jwt.sign(
                {
                    email: user.email,
                    _id: user._id,
                    role: user.role
                },
                'secretfortoken'
            );
            return res.send({
                message: 'התחבר בהצלחה',
                token: token
            });
        }
    } catch {
        return res.status(500).send({ message: "תקלה בכניסה" });
    }
}

exports.signup = async (req, res, next) => {
    console.log('signup');

    try {
        const body = req.body;
        console.log(body)

        const email = body?.email;
        const password = body?.password;
        if (email == null) {
            res.status(400).send({ message: "אימייל חסר" });
            return;
        }
        if (password == null) {
            res.status(400).send({ message: "סיסמא חסרה" });
            return;
        }
        let user = await userModel.findOne({ email: email });
        if (!user) {
            // Create user in the database if it doesn't exist
            user = new userModel({ email: email, password: password });
            await user.save();
            return res.send({
                message: 'נרשם בהצלחה'
            });
        } else {
            return res
                .status(400)
                .send({ message: `האימייל כבר רשום באתר, חזור אחורה או שחזר סיסמא` });
        }

    } catch {
        return res.status(500).send({ message: "Internal server error." });
    }
}

exports.reset = async (req, res, next) => {
    console.log('reset');
    try {
        const body = req.body;
        const email = body?.email;
        const alpha = 'abcdefghijklmnopqrstuvwxyz';
        const calpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const num = '1234567890';
        const specials = ',.!@#$%^&*';
        const options = [alpha, alpha, alpha, calpha, calpha, num, num, specials];
        let opt, choose;
        let pass = "";
        for (let i = 0; i < 8; i++) {
            opt = Math.floor(Math.random() * options.length);
            choose = Math.floor(Math.random() * (options[opt].length));
            pass = pass + options[opt][choose];
            options.splice(opt, 1);
        }
        const password = pass;
        if (email == null) {
            res.status(400).send({ message: "אימייל חסר" });
            return;
        }
        user = await userModel.updateOne({ email: email }, { password: password })
        sendMails(email, 'איפוס סיסמא באפליקציה', password);
        return res.send({
            message: 'הסיסמא החדשה נמצאת אצלך במייל'
        });

    } catch {
        return res.status(500).send({ message: "Internal server error." });
    }
}


exports.getUserByJWT = async (req, res, next) => {
    console.log('getUserByJWT');
    try {
        let user = await userModel.findOne({ _id: req._id });
        res.status(200).json(user);

    } catch {
        return res.status(500).send({ message: "Internal server error." });
    }
}

exports.getAll = async (req, res, next) => {
    console.log('getAll');
    try {
        let user = await userModel.find({});
        res.status(200).json(user);

    } catch {
        return res.status(500).send({ message: "Internal server error." });
    }
}

exports.remove = async (req, res, next) => {
    console.log('remove');
    try {
        let user = await userModel.findByIdAndRemove({ _id: req._id });
        res.status(200).json({ message: req._id + " נמחק" });

    } catch {
        return res.status(500).send({ message: "Internal server error." });
    }
}


exports.contact = async (req, res, next) => {
    console.log('contact');
    const userphone = req.body.phone;
    const usertext = req.body.content;
    const url = req.body.url;
    const content = userphone + " " + usertext + ",url: " + url;
    try {
        sendMails('razonir@Gmail.com', 'יצירת קשר באתר', content);
        return res.send({
            message: 'הודעה נשלחה בהצלחה'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}