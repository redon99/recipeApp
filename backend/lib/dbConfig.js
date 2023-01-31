const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
  connect: () => {
    mongoose.set('strictQuery', true);
    mongoose
      .connect(process.env.DATABASE_URL)
      .then(console.log('DB connected!'))
      .catch(err => console.log(err));
  },
};
