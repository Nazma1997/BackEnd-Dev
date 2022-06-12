const router = require('express').Router();

const db = require('../db/db');

router.get('/health', (_req, res) => {
  res.json({message: "Success"});
});


// pick up from another file
router.get('/t/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  const ticket = db.findById(ticketId);
  res.status(200).json(ticket);
});
router.patch('/t/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  const updatedTicket = db.updateById(ticketId, req.body);
  res.status(200).json({message: 'Updated SuccessFully', updatedTicket})
});
router.delete('/t/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  db.deleteById(ticketId);
  res.status(200).send();
});


router.get('/u/:username', (req, res) => {
const username = req.params.username;
const user = db.findByUserName(username);
res.status(200).json(user);
});
router.patch('/u/:username', (req, res) => {
const username = req.params.username;
const updatedUserName = db.findByUserName(username, req.body);
res.status(200).json({message: 'Updated Successfully', updatedUserName});
});
router.delete('/u/:username', (req, res) => {
const username = req.params.username;
db.deleteByUsername(username);
res.status(200).send();
});

router.post('/sell', (req, res) => {
const {username, price} = req.body;
const ticket = db.create(username, price);
res.status(201).json({message: 'Ticket Created SuccessFully', ticket});
});
router.post('/bulk', (req, res) => {
const {username, price} = req.body;
const tickets = db.bulkCreate(username, price, quantity);
res.status(201).json({message: 'Ticket Created SuccessFully', tickets});
});
router.get('/draw', (req, res) => {
const winnerCount = req.query.wc ?? 3;
const winners = db.draw(winnerCount);
res.status(200).json(winners);
});
router.get('/tickets', (req, res) => {
const tickets = db.find();
res.status(200).json(tickets);
});




module.exports = router