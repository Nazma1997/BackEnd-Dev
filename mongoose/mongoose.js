const mongoose = require('mongoose');


mongoose
.connect('mongodb://localhost:27017/demo')
.then(() => {
  console.log('Database is Connected')
})
.catch((error) => {
  console.log(error)
})
.finally(() => {
  mongoose.connection.close()
})
