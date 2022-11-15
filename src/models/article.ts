import { PrismaClient, Prisma } from '@prisma/client';

import { CreateData } from '../types/createArticle';
import { UpdateData } from '../types/updateArticle';
import { getArticle } from '../routes/article/article.service';

const prisma = new PrismaClient();

export const createArticleData = async (data: CreateData) => {
  const { title, category_id, content, image_id } = data;

  try {
    const newArticle = await prisma.article.create({
      data: {
        title,
        category_id,
        content,
        image_id,
      },
    });

    const filteredNewArticle = {
      title: newArticle.title,
      content: newArticle.content,
      category_id: newArticle.category_id,
      image_id: newArticle.image_id,
      view: newArticle.view,
    };
    return { data: { ...filteredNewArticle } };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        message: "Couldn't create Article due to invalid value",
      };
    }
    return { success: false, message: 'Something went wrong' };
  }
};

export const updateArticleData = async (data: UpdateData) => {
  const { id, title, content, category_id, image_id } = data;

  try {
    const updatedArticle = await prisma.article.update({
      where: {
        id,
      },
      data: {
        // if the target field is false, then return undefined, otherwise return it's value
        title: title || undefined,
        content: content || undefined,
        category_id: category_id || undefined,
        image_id: image_id || undefined,
      },
    });

    const filteredUpdatedArticle = {
      title: updatedArticle.title,
      content: updatedArticle.content,
      category_id: updatedArticle.category_id,
      image_id: updatedArticle.category_id,
      view: updatedArticle.view,
    };

    return { data: { ...filteredUpdatedArticle } };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        message: "Couldn't update Article due to invalid value",
      };
    }

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};

export const getArticlesData = async () => {
  try {
    const articles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        category_id: true,
        content: true,
        image_id: true,
        createdAt: true,
        view: true,
      },
    });
    return { data: { ...articles } };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        message: "Couldn't load articles from database",
      };
    }

    return { success: false, message: 'Something went wrong' };
  }
};

export const getArticleData = async (id: string) => {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    return { data: { ...article } };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        message: "Couldn't load article form database",
      };
    }

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};

export const deleteArticleData = async (id: string) => {
  try {
    const deletedArticle = await prisma.article.delete({
      where: {
        id,
      },
    });
    return { data: { deletedArticle } };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, message: "Couldn't delete the article" };
    }

    return { success: false, message: 'Something went wrong' };
  }
};
