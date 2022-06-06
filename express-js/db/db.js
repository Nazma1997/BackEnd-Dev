const Ticket = require('../models/Ticket');

class MyDB {
  constructor(){
    this.tickets = []
  }

 
  /**
     * Create new ticket
     * @params {String} username
     * @params {Number} price
     * @returns(Ticket)
     */
   create(username, price){
     const ticket = new Ticket(username, price);
     this.tickets.push(ticket);
     return ticket

   }
   /**
    * create multiple ticket for a single person
    * @params {String} username
    * @params {Number} price
    * @params {Number} quantity
    * @returns {Array<Ticket>}
    */

   // Sell Multiple Ticket
   bulkCreate(username, price, quantity){

    const result = [];
    for(let i=0; i< quantity; i++){
      const ticket = this.create(username, price);
      result.push(ticket);

    }
    return result;

   }
  

  
     /**
    * returns all available 
    */
   
  find(){
           return this.tickets;
  }

  /**
   * find ticket by id
   * @params {String} ticketId
   * @returns {Ticket}
   */

  findById(ticketId){
    const ticket = this.ticket.find(
      /** 
       * @param {Ticket} ticket 
       **/
      (ticket) => ticket.id == ticketId
    )
     return ticket;

  }
  /**
   * find all tickets for a given user name
   * @params {String} username
   * @returns {Array<Ticket>}
   */

  findByUserName(username){
     const tickets = this.tickets.filter(
       /**
        * @params {Ticket} ticket
        * 
        */
       (ticket) => ticket.username == username
     )
     return tickets;
  }

  /**
   * update ticket
   * @params {string} ticketId
   * @params {{username : String, price: Number}} ticketBody
   * @returns {Ticket}
   * 
   */
   updateById(ticketId, ticketBody){
     const ticket= this.findById(ticketId);
     ticket.username = ticketBody.username ?? ticket.username;
     ticket.price = ticketBody.price ?? ticket.price;
     ticket.updatedAt = new Date();

     return ticket;

   } 
   /**
    * Delete id
    * @params {string} ticketId
    */
   deleteById(ticketId){
         const index = this.tickets.findIndex((ticket) => ticket.id == ticketId);

         if(index !== -1){
           this.ticket.splice(index, 1);
           return true;
         }else{
           return false;
         }
   }
 deleteByUsername(username){
   const index = this.tickets.findIndex((ticket) => ticket.username == username);
   if(index !== -1){
     this.ticket.splice(index,1);
     return true;
   } else{
     return false;
   }

 }
    /**
     * find winners
     * @param {Number} winnerCount 
     * r@returns {Array<Ticket>}
     */
    draw(winnerCount){
         let winnerIndexes = new Array(winnerCount);

         let index = 0;
         while(index < winnerCount){
           let winnerIndex = Math.floor(Math.random() * this.tickets.length);
           
           if(!winnerIndexes.includes(winnerIndex)){
             winnerIndexes[index++] = winnerIndex;
           }
         }
             

         const winners = winnerIndexes.map(index => this.tickets[index]);
         return winners;
    }

}


const myDB = new MyDB();

module.exports = myDB;