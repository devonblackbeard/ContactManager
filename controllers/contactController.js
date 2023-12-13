// @desc Get all contacts
// @route GET /api/contacts
// @access public
import asyncHandler from 'express-async-handler'
import Contact from '../models/contactModel.js'


const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find()
    res.status(200).json(contacts)
})

// @desc Get specific contact
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(400);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact)
})

// @desc Create new contact
// @route Post /api/contacts/
// @access public
const postContact = asyncHandler(async (req, res) => {
    console.log("Request body is: ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
        name, email, phone
    })
    res.status(201).json(contact)
})

// @desc Update specific contact
// @route Put /api/contacts/:id
// @access public
const putContact = asyncHandler(async (req, res) => {
    // res.status(200).json({message: `Update contact ${req.params.id}`})
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(400);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(updatedContact)
})

// @desc Delete specific contact
// @route Delete /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => { // why is this :id and not id
    const contact = await Contact.findById(req.params.id);
    console.log("in delete, contact: ", contact);
    if (!contact) {
        res.status(400);
        throw new Error("Contact not found");
    }
    
    const result = await contact.deleteOne()
    if (result.deletedCount === 1) res.status(200).json(contact)
})

export default { getContacts, getContact, postContact, putContact, deleteContact }