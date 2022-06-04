const router = require('express').Router();

router.get('/health', (_req, res) => {
  res.json({message: "Success"});
});

module.exports = router