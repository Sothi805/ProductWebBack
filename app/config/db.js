// require('dotenv').config();
// module.exports = {
//   database: {
//     dialect: "mysql",
//     host: process.env.DB_HOST,
//     username: process.env.DB_USER,
//     database: process.env.DB_NAME,
//   },
//   jwtSecret: process.env.JWT_SECRET
// }
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin:admin%40123@cluster0.66tar.mongodb.net/survey_db?retryWrites=true&w=majority&appName=Cluster0").then((res) => {
  console.log(res);

}).catch((er) => {
  console.log('PLOKC IS:', er);

})
module.exports = {
  mongoose: mongoose,
  jwtSecret: process.env.JWT_SECRET || 'jwt_my_coding',
};