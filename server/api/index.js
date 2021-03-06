const router = require('express').Router()

router.use('/auth', require('./auth'));
router.use('/products', require('./products'))
router.use('/users', require('./users'))
router.use('/categories', require('./categories'))
router.use('/orders', require('./orders'))
router.use('/reviews', require('./reviews'))
router.use('/payment', require('./payment'))
router.use('/lineItems', require('./lineItems'))
router.use('/guest', require('./guest'))

module.exports = router
