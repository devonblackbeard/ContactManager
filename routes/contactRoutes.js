import express from 'express'
const router = express.Router()
//import { getContact, getSpecificContact, postContact, putContact } from '../controllers/contactController.js'
import contactControllers from '../controllers/contactController.js'

const { getContacts, getContact, postContact, putContact, deleteContact } = contactControllers;

// Now you can use these functions in your code


router.route("/").get(getContacts).post(postContact)
router.route("/:id").get(getContact).put(putContact).delete(deleteContact)


// module.exports = router; dont use commonJS syntax, use ES6
export default router