const historyTaskModel = require('../models/historytask')

exports.getAll = async (req, res, next) => {
    console.log('getAllhis')
    try {
        let tasks = await historyTaskModel.find({});
        res.status(200).json(tasks);

    } catch {
        return res.status(500).send({ message: "Internal server error." });
    }
}


exports.getAllByJWT = async (req, res, next) => {
    console.log('getAllhisJwt')

    try {
        let tasks = await historyTaskModel.find({ userid: req._id });
        res.status(200).json(tasks);

    } catch {
        return res.status(500).send({ message: "Internal server error." });
    }
}