import { createContact, fetchContact, getAllContacts, modifyContact } from "../controllers/contacts.controller.js";
import express from 'express'
import AuthMiddleware from "../middlewares/auth.middleware.js";

const ContactsRouter = express.Router()

ContactsRouter
  .post("/", createContact)
  .get("/", AuthMiddleware ,getAllContacts)
  .get("/:id", fetchContact)
  .put("/:id", modifyContact);

export default ContactsRouter;