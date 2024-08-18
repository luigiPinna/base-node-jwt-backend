import { AppDataSource } from "../data-source";
import { Article } from "../models/Article";
import { User } from "../models/User";
import { ArticleDTO } from "../dto/ArticleDTO";

/**
 * Service class for handling article-related operations.
 */
export class ArticleService {
    // Repositories for database operations
    private articleRepository = AppDataSource.getRepository(Article);
    private userRepository = AppDataSource.getRepository(User);

    /**
     * Creates a new article.
     *
     * @param title - The title of the article
     * @param content - The content of the article
     * @param authorId - The ID of the author (user)
     * @returns Promise<ArticleDTO> - The newly created article as DTO
     * @throws Error if the author is not found
     */
    async createArticle(title: string, content: string, authorId: number): Promise<ArticleDTO> {
        // Find the author by ID
        const author = await this.userRepository.findOneBy({ id: authorId });
        if (!author) {
            throw new Error("Author not found");
        }

        // Create new article instance
        const article = new Article();
        article.title = title;
        article.content = content;
        article.author = author;

        // Save and return the new article as DTO
        const savedArticle = await this.articleRepository.save(article);
        return new ArticleDTO(savedArticle);
    }

    /**
     * Retrieves all articles with their authors.
     *
     * @returns Promise<ArticleDTO[]> - Array of all articles as DTOs
     */
    async getArticles(): Promise<ArticleDTO[]> {
        const articles = await this.articleRepository.find({ relations: ["author"] });
        return articles.map(article => new ArticleDTO(article));
    }

    /**
     * Retrieves a single article by its ID.
     *
     * @param id - The ID of the article to retrieve
     * @returns Promise<ArticleDTO | null> - The article as DTO if found, null otherwise
     */
    async getArticle(id: number): Promise<ArticleDTO | null> {
        const article = await this.articleRepository.findOne({ where: { id }, relations: ["author"] });
        return article ? new ArticleDTO(article) : null;
    }

    /**
     * Updates an existing article.
     *
     * @param id - The ID of the article to update
     * @param title - The new title of the article
     * @param content - The new content of the article
     * @param authorId - The ID of the author attempting to update the article
     * @returns Promise<ArticleDTO | null> - The updated article as DTO if successful, null if article not found or author mismatch
     */
    async updateArticle(id: number, title: string, content: string, authorId: number): Promise<ArticleDTO | null> {
        // Find the article by ID, including its author
        const article = await this.articleRepository.findOne({ where: { id }, relations: ["author"] });

        // Check if article exists and the author is the one attempting to update
        if (!article || article.author.id !== authorId) {
            return null;
        }

        // Update article properties
        article.title = title;
        article.content = content;

        // Save and return the updated article as DTO
        const updatedArticle = await this.articleRepository.save(article);
        return new ArticleDTO(updatedArticle);
    }

    /**
     * Deletes an article.
     *
     * @param id - The ID of the article to delete
     * @param authorId - The ID of the author attempting to delete the article
     * @returns Promise<boolean> - True if deletion was successful, false if article not found or author mismatch
     */
    async deleteArticle(id: number, authorId: number): Promise<boolean> {
        // Find the article by ID, including its author
        const article = await this.articleRepository.findOne({ where: { id }, relations: ["author"] });

        // Check if article exists and the author is the one attempting to delete
        if (!article || article.author.id !== authorId) {
            return false;
        }

        // Remove the article and return true to indicate success
        await this.articleRepository.remove(article);
        return true;
    }
}
