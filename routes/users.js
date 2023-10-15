const express = require('express');
const router = express.Router();
const user = require('../services/user.services');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await user.getMultiple());
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});

router.post('/addUser', async (req, res) => {
  try {
    res.json(await user.addAndEditUser(req.body));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
  }
})

module.exports = router;
