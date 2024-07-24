const mongoose =require('mongoose');
require('dotenv').config();

const dbConnect= ()=>{
    mongoose.connect(
    process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    } 
).then(() => {
    console.log('Database connected');
}).catch((err) => { 
    console.log(err);
});
}
module.exports = dbConnect;