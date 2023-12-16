import express from 'express'
const router = express.Router()
import contactControllers from '../controllers/contactController.js'
import validateToken from '../middleware/validateTokenHandler.js';

const { getContacts, getContact, postContact, updateContact, deleteContact } = contactControllers;


router.use(validateToken)
router.route("/").get(getContacts).post(postContact)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)


// module.exports = router; dont use commonJS syntax, use ES6
export default router