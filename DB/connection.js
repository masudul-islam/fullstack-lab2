const mongoose =require("mongoose");
const signale = require("signale");


async function main (){
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology :true});
    const mgDB = mongoose.connection;
    mgDB.on("connected" , console.log.bind(signale.success("MongooDB and mongoose are connected.")))
}
module.exports = main;