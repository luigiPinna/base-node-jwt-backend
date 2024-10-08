import { Router } from "express";
import { createArticle, getArticles, getArticle, updateArticle, deleteArticle, articleValidation } from "../controllers/articleController";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", [authMiddleware, isAdmin, ...articleValidation], createArticle);
router.get("/", getArticles);
router.get("/:id", getArticle);
router.put("/:id", [authMiddleware, isAdmin, ...articleValidation], updateArticle);
router.delete("/:id", [authMiddleware, isAdmin], deleteArticle);

export default router;