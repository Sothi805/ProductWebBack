
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL).then((res) => {
  console.log(res);

}).catch((er) => {
  console.log('PLOKC IS:', er);

})
module.exports = {
  mongoose: mongoose,
  jwtSecret: process.env.JWT_SECRET || 'jwt_my_coding',
};