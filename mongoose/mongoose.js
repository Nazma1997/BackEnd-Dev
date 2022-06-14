const mongoose = require('mongoose');

const peopleScheme = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email:String,
  age: Number
})

const People = mongoose.model('People', peopleScheme)

async function personCreate(data){
  const person = new People({...data});
  await person.save()
  return person
}
mongoose
.connect('mongodb://localhost:27017/demo')
.then(async () => {
  console.log('Database is Connected')
  await personCreate({firstName: 'Tanbir', lastName:'Ahamed', email:'tanbit@gmail.com', age:34})
  console.log('person created')
 
})
.catch((error) => {
  console.log(error)
})
.finally(() => {
  mongoose.connection.close()
})
