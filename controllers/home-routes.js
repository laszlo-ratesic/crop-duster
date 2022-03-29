const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('dashboard');
})

router.get('/profile', (req, res) => {
    res.render('profile');
})

router.get('/settings', (req, res) => {
    res.render('settings');
})

module.exports = router;