const taskModel = require('../models/task')
const historyTaskModel = require('../models/historytask');

exports.remove = async (req, res, next) => {
    console.log('removetask')
    try {
        const body = req.body;
        const _id = body._id;

        if (_id == null) {
            res.status(400).send({ message: "חסר ID" });
            return;
        }
        let task = await taskModel.findByIdAndRemove({ _id: _id });

        if (task == null) {
            res.status(400).send({ message: "לא נמצא" });
            return;
        }
        return res.send({
            message: 'נמחק בהצלחה'
        });
    } catch {
        return res.status(500).send({ message: "תקלה בדרך" });
    }
}

exports.done = async (req, res, next) => {
    console.log('donetask')

    try {
        const body = req.body;
        const _id = body._id;
        const userid = req._id;
        if (_id == null) {
            res.status(400).send({ message: "Missing id" });
            return;
        }
        let task = await taskModel.findByIdAndUpdate({ _id: _id, userid: userid }, { status: 'success' });
        if (task == null) {
            res.status(400).send({ message: "Task not found" });
            return;
        }
        var date = new Date();
        var dateStr =
          ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
          ("00" + date.getDate()).slice(-2) + "/" +
          date.getFullYear() + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);
        let historytask = new historyTaskModel({
            name: task.name,
            content: task.content,
            status: task.status,
            date: dateStr,
            userid: task.userid
        });
        await historytask.save();
        await task.save();
        return res.send({
            message: 'Successfully done task'
        });
    } catch {
        return res.status(500).send({ message: "Internal server error." });
    }
}

exports.add = async (req, res, next) => {
    console.log('addtask')

    try {
        const body = req.body;
        const name = body.name;
        const content = body.content;
        const userid = req._id;
        if (name == null) {
            res.status(400).send({ message: "Missing name" });
            return;
        }
        if (content == null) {
            res.status(400).send({ message: "Missing content" });
            return;
        }
        if (userid == null) {
            res.status(400).send({ message: "Missing id" });
            return;
        }
        let task = new taskModel({ name: name, content: content, userid: userid });
        await task.save();
        return res.send({
            message: 'Successfully add task'
        });

    } catch {
        return res.status(500).send({ message: "Internal server error." });
    }
}

exports.getAllByJWT = async (req, res, next) => {
    console.log('getalljwt task')

    try {
        let tasks = await taskModel.find({ userid: req._id, status: 'not' });
        res.status(200).json(tasks);

    } catch {
        return res.status(500).send({ message: "Internal server error." });
    }
}
exports.getAllDoneByJWT = async (req, res, next) => {
    console.log('getdone task')

    try {
        let tasks = await taskModel.find({ userid: req._id, status: 'success' });
        res.status(200).json(tasks);

    } catch {
        return res.status(500).send({ message: "Internal server error." });
    }
}
exports.getOne = async (req, res, next) => {
    console.log('getone task')

    try {
        const body = req.body;
        const id = body._id;
        let tasks = await taskModel.findOne({ _id: id });
        res.status(200).json(tasks);
    } catch {
        return res.status(500).send({ message: "Internal server error." });
    }
}


exports.getAll = async (req, res, next) => {
    console.log('get all task')

    try {
        let tasks = await taskModel.find({});
        res.status(200).json(tasks);

    } catch {
        return res.status(500).send({ message: "Internal server error." });
    }
}


exports.allNot = async (req, res, next) => {
    console.log('all not task')

    try {
        let task = await taskModel.updateMany({ status: 'success' },{ $set: {status:'not'}});
        console.log(task)
        return res.send({
            message: 'Successfully done task'
        });
    } catch {
        return;
    }
}