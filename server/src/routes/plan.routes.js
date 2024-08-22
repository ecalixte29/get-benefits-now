import { Router } from "express";
import { getPlans, getPlansByContact } from '../controllers/plans.controller.js';

const router = Router();

router.get("/:id", getPlans);
router.get("/lead/:contactId", getPlansByContact);

export default router;
