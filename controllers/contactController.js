// @desc Get all contacts
// @route GET /api/contacts
// @access private
import asyncHandler from 'express-async-handler'
import contactSchema from '../models/contactModel.js'


const getContacts = asyncHandler(async (req, res) => {
    console.log("HI");
    console.log(req.query.user);
    // @ts-ignore
    const contacts = await contactSchema.find({ user_id: req.query.user.id })
    res.status(200).json(contacts)
})

// @desc Get specific contactSchema
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await contactSchema.findById(req.params.id);
    if (!contact) {
        res.status(400);
        throw new Error("contactSchema not found");
    }
    res.status(200).json(contact)
})

// @desc Create new contactSchema
// @route Post /api/contacts/
// @access private
const postContact = asyncHandler(async (req, res) => {
    console.log("Request body is: ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    console.log(req.query.user);
    try {
        const contact = await contactSchema.create({
            name, email, phone, user_id: req.query.user.id
        })
        res.status(201).json(contact)
    }
    catch (e) {
        console.log(e)
    }

})

// @desc Update specific contactSchema
// @route Put /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await contactSchema.findById(req.params.id)
    if (!contact) {
        res.status(400);
        throw new Error("contact not found");
    }

    // @ts-ignore
    if (contact.user_id.toString() !== req.query.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    const updatedContact = await contactSchema.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(updatedContact)
})

// @desc Delete specific contactSchema
// @route Delete /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await contactSchema.findById(req.params.id);
    if (!contact) {
        res.status(400);
        throw new Error("contact not found");
    }

    // @ts-ignore
    if (contact.user_id.toString() !== req.query.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    const result = await contactSchema.deleteOne()
    if (result.deletedCount === 1) res.status(200).json(contactSchema)
})

export default { getContacts, getContact, postContact, updateContact, deleteContact }