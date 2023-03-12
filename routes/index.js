const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((request, response) => response.send('Wrong route!'));

module.exports = router;