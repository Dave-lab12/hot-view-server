export type Article = {
    id?: string;
    title: string;
    category: string;
    content: string;
    image_id: string | null;
    createdAt: Date;
    view: number | null;   
}