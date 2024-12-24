const mongoose  = require('mongoose')
const ConnectDb = async() => {
    try {
        const db = await mongoose.connect('mongodb+srv://bsmcustomer01:bsm123@cluster0.4ig22.mongodb.net/BSM_App')
        console.log(`Mongodb Connected : --  ${db.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}
module.exports = ConnectDb