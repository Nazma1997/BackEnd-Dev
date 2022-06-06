## Sell Lottery Ticket API ##

- Sell Lottery Ticket
- Update Lottery Ticket
- Delete Lottery Ticket
- Get All Ticket
- Get Ticket by Id
- Bulk Ticket(user can buy multiple ticket at a time)
- Raffle Draw


# Ticket Model #
 - Number(unique)
 - User Name
 - Price
 - Timestamp
 
 # Routes #

  
  - /tickets/t/ticketId GET - find single ticket
  - /tickets/t/tickedId PUT or PATCH - update ticket by id
  - /tickets/t/ticketId DELETE - delete ticket by id
  - /tickets/u/:username GET - find ticket for a given user
  - /tickets/u/:username PUT or PATCH - update a ticket for a given user name
  - /tickets/u/:username DELETE - delete a ticket for a given user name
  - /tickets/sell - create ticket
  - /tickets/bulk - bulk sell tickets
  - /tickets/draw - draw the tickets
  - /tickets - find all tickets 