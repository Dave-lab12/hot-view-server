import { PrismaClient, Prisma } from '@prisma/client';

import { CreateData } from '../types/createArticle';
import { UpdateData } from '../types/updateArticle';
// import Prisma from '../utils/prismaConnection';

const prisma = new PrismaClient();

export const createArticleData = async (data: CreateData) => {
  const { title, categoryId, content, imageId } = data;
  try {
    const newArticle = await prisma.article.create({
      data: {
        title,
        categoryId,
        content,
        image_id: imageId,
      },
    });

    const filteredNewArticle = {
      title: newArticle.title,
      content: newArticle.content,
      categoryId: newArticle.categoryId,
      image_id: newArticle.image_id,
      view: newArticle.view,
    };
    return { success: true, data: { ...filteredNewArticle } };
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
  const { id, title, content, categoryId, imageId } = data;

  try {
    const updatedArticle = await prisma.article.update({
      where: {
        id,
      },
      data: {
        // if the target field is false, then return undefined, otherwise return it's value
        title: title || undefined,
        content: content || undefined,
        categoryId: categoryId || undefined,
        image_id: imageId || undefined,
      },
    });

    const filteredUpdatedArticle = {
      title: updatedArticle.title,
      content: updatedArticle.content,
      categoryId: updatedArticle.categoryId,
      image_id: updatedArticle.categoryId,
      view: updatedArticle.view,
    };

    return { success: true, data: { ...filteredUpdatedArticle } };
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
        categoryId: true,
        content: true,
        image_id: true,
        createdAt: true,
        view: true,
      },
    });
    return { success: true, data: articles };
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

    return { success: true, data: { ...article } };
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
    return { success: true, data: { deletedArticle } };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, message: "Couldn't delete the article" };
    }

    return { success: false, message: 'Something went wrong' };
  }
};
