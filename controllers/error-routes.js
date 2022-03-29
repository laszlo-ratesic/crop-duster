const router = require('express').Router();

router.get('/404', (req, res) => {
    res.render('404-error', {layout: 'error.hbs'});
})

module.exports = router;