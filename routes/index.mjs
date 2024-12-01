import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
  res.render("index", { title: "Задача 2." });
});
export default router;
