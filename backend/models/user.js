const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    id: {type: String, required: false, default: '0'},
    nick: {type: Number, required: false, default: 0},
    email: {type: String, required: false, default: 'NA'},
    phone: {type: String, required: false, default: 'NA'},
    name: {type: String, required: false, default: 'NA'},
    secondName: {type: String, required: false, default: 'NA'},
    appat: {type: String, required: false, default: 'NA'},
    apmat: {type: String, required: false, default: 'NA'},
    birth: {type: Date, required: false, default: new Date()},
    status: {type: String, required: false, default: 'PENDIENTE'},
    analist: {type: String, required: false, default: 'NA'},

    numberCard: {type: String, required: false, default: 'NA'},
    prov: {type: String, required: false, default: 'NA'},
    venc: {type: String, required: false, default: 'NA'},
    cvv: {type: Number, required: false, default: 0},
    pin: {type: Number, required: false, default: 0},
    fullName: {type: String, required: false, default: 'NA'},
});

module.exports = mongoose.model('users', UserSchema, 'users');