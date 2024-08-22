import { Router } from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactById,
} from "../controllers/contact.controller.js";

const router = Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContactById);

export default router;
