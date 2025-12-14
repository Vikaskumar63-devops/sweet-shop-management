import { Router } from "express";
import {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from "../controllers/sweetController";

const router = Router();

router.post("/", addSweet);
router.get("/", getSweets);
router.get("/search", searchSweets);
router.put("/:id", updateSweet);
router.delete("/:id", deleteSweet);

router.post("/:id/purchase", purchaseSweet);
router.post("/:id/restock", restockSweet);

export default router;
