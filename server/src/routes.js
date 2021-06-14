const router = require('express').Router();

const signin = require('./routes/signin');
const signup = require('./routes/signup');
const checktoken = require('./routes/checktoken');
const remembers = require('./routes/remembers');
const { create, del } = require('./routes/handleRemembers');


router.post('/api/signup', signup);
router.post('/api/signin', signin);
router.post('/api/checktoken', checktoken);
router.get('/api/remembers', remembers);
router.post('/api/remembers/delete', del);
router.post('/api/remembers/new', create);

module.exports = router;
