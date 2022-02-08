const userModel = require('../models/user');
const usersCtrl = {};

usersCtrl.addUser = async (req, res)=>{
    let data = JSON.parse(JSON.stringify(req.body));

    data.id = await (userModel.find({}).count()) + 1;
    data.nick = await (userModel.find({}).count()) + 1;

    var userSave = new userModel(data);
    userSave.save((err, save) => {
        if(err){
            console.log(err);
            return res.status(200).json({err: true, data: err});
        }else{
            return res.status(200).json({err: false, data: save});
        }
    });
};

usersCtrl.updateUsers = async (req, res)=>{
    let filters = req.query?req.query:{};
    console.log(filters);
    let data = req.body;
    console.log(data);

    userModel.findOneAndUpdate(filters, {$set: data},(err, save) => {
        if(err){
            return res.status(200).json({err: true, data: err});
        }
        return res.status(200).json({err: false, data: save});
    })
};

usersCtrl.deleteUsers = async (req, res)=>{
    let filters = req.query?req.query:{};

    userModel.findOneAndRemove(filters,(err, save) => {
        if(err){
            return res.status(200).json({err: true, data: err});
        }
        return res.status(200).json({err: false, data: save});
    })
};

usersCtrl.getUsers = async (req, res)=>{
    console.log(req.query);
    let filters = req.query?req.query:{};

    userModel.find(filters,(err, save) => {
        if(err){
            return res.status(200).json({err: true, data: err});
        }
        return res.status(200).json({err: false, data: save});
    });
};

module.exports = usersCtrl;