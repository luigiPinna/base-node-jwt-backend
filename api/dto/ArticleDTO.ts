import {Article} from "../models/Article";

export class ArticleDTO {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: {
        id: number;
        email: string;
    };

    constructor(article: Article) {
        this.id = article.id;
        this.title = article.title;
        this.content = article.content;
        this.createdAt = article.created_at;
        this.updatedAt = article.updated_at;
        this.author = {
            id: article.author.id,
            email: article.author.email,
        };
    }
}
