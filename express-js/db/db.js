const Ticket = require('../models/Ticket');

class MyDB {
  constructor(){
    this.tickets = []
  }

 
  /**
     * Create new ticket
     * @params {String} username
     * @params {Number} price
     */
   create(username, price){

    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket

   }

   // Sell Multiple Ticket
   bulkCreate(){

   }

   // raffle draw
   draw(){

   }

  // Return All 
  find(){

  }

  // Single Ticket

  findById(){


  }

  // Update Ticket info
   updateById(){

   } 

   //Delete By Id
   deleteById(){

   }

}


const myDB = new MyDB();

module.exports = myDB;