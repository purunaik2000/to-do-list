const router = require('express').Router();
const {register, login} = require('../controllers/userController');
const {addWork, getAllWorks, removeWork} = require('../controllers/workController');
const auth = require('../middlewares/auth');

router.get('/test', (req, res) => {
    res.send('Working fine');
});

router.post('/register', register);
router.post('/login', login);

router.post('/work/add', auth, addWork);
router.get('/work/getAll/:page', auth, getAllWorks);
router.delete('/work/delete/:workId', auth, removeWork);

router.all('*', (req, res)=> res.status(404).send({
    status: false,
    message: 'Page not found'
}));

module.exports = router;