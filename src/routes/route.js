const router = require('express').Router();
const {register, login} = require('../controllers/userController');
const {addWork, getAllWorks, getPendingWorks, removeWork} = require('../controllers/workController');
const auth = require('../middlewares/auth');

router.get('/test', (req, res) => {
    res.send('Working fine');
});

router.post('/register', register);
router.post('/login', login);

router.post('/work/add', auth, addWork);
router.get('/work/getAll/:page', auth, getAllWorks);
router.get('/work/pending/:page', auth, getPendingWorks);
router.delete('/work/delete/:id', auth, removeWork);

router.all('*', (req, res)=> res.status(404).send({
    status: false,
    message: 'Page not found'
}));

module.exports = router;