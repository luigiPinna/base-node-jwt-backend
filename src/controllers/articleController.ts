import { Request, Response, NextFunction } from "express";
import { ArticleService } from "../services/ArticleService";
import { body, validationResult } from "express-validator";

// Istanza del servizio per gestire le operazioni sugli articoli
const articleService = new ArticleService();

// Middleware di validazione per i campi di input
export const articleValidation = [
    body("title").notEmpty().isString().withMessage("Title is required and must be a string"),
    body("content").notEmpty().isString().withMessage("Content is required and must be a string")
];

/**
 * Crea un nuovo articolo.
 * @param req - La richiesta HTTP, che deve contenere il titolo e il contenuto dell'articolo e l'utente autenticato.
 * @param res - La risposta HTTP che contiene l'articolo creato o un errore.
 * @param next - Funzione per passare al middleware successivo in caso di errore.
 */
export const createArticle = async (req: Request, res: Response, next: NextFunction) => {
    // Controlla se ci sono errori di validazione
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Verifica che l'utente sia autenticato
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Verifica che l'utente sia admin

    const { title, content } = req.body;
    try {
        // Crea l'articolo utilizzando il servizio
        const article = await articleService.createArticle(title, content, req.user.id);
        res.status(201).json(article);
    } catch (error) {
        next(error);
    }
};

/**
 * Recupera tutti gli articoli.
 * @param req - La richiesta HTTP.
 * @param res - La risposta HTTP che contiene la lista degli articoli.
 * @param next - Funzione per passare al middleware successivo in caso di errore.
 */
export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Recupera tutti gli articoli dal servizio
        const articles = await articleService.getArticles();
        res.json(articles);
    } catch (error) {
        next(error);
    }
};

/**
 * Recupera un singolo articolo in base all'ID.
 * @param req - La richiesta HTTP, che deve contenere l'ID dell'articolo.
 * @param res - La risposta HTTP che contiene l'articolo o un errore se non trovato.
 * @param next - Funzione per passare al middleware successivo in caso di errore.
 */
export const getArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Recupera l'articolo dal servizio usando l'ID
        const article = await articleService.getArticle(parseInt(req.params.id));
        if (article) {
            res.json(article);
        } else {
            res.status(404).json({ message: "Article not found" });
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Aggiorna un articolo esistente.
 * @param req - La richiesta HTTP, che deve contenere il titolo e il contenuto aggiornati, e l'utente autenticato.
 * @param res - La risposta HTTP che contiene l'articolo aggiornato o un errore.
 * @param next - Funzione per passare al middleware successivo in caso di errore.
 */
export const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
    // Controlla se ci sono errori di validazione
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Verifica che l'utente sia autenticato
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, content } = req.body;
    try {
        // Aggiorna l'articolo usando il servizio
        const article = await articleService.updateArticle(parseInt(req.params.id), title, content, req.user.id);
        if (article) {
            res.json(article);
        } else {
            res.status(404).json({ message: "Article not found or you're not authorized to update it" });
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Elimina un articolo esistente.
 * @param req - La richiesta HTTP, che deve contenere l'ID dell'articolo e l'utente autenticato.
 * @param res - La risposta HTTP che conferma l'eliminazione o un errore.
 * @param next - Funzione per passare al middleware successivo in caso di errore.
 */
export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
    // Verifica che l'utente sia autenticato
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Elimina l'articolo usando il servizio
        const result = await articleService.deleteArticle(parseInt(req.params.id), req.user.id);
        if (result) {
            res.json({ message: "Article deleted successfully" });
        } else {
            res.status(404).json({ message: "Article not found or you're not authorized to delete it" });
        }
    } catch (error) {
        next(error);
    }
};
