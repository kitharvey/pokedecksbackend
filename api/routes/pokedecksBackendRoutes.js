const express = require('express')
const router = express.Router()
const users = require('../controllers/pokedecksBackendController')


router.post('/signin', users.signin)
router.patch('/favorites/:id', users.checkuser, users.patchFavorites)
router.patch('/score/:id', users.checkuser, users.patchScore)
router.delete('/delete', users.deleteUser)
router.get('/users', users.getUsers)




module.exports = router

