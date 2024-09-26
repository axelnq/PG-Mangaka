import { db } from "../app"

export const addToTheList = async (id: string, list: string, mangaId: number, userList: number[]) => {
  try {
    let newList= [...userList, mangaId];
    await db.user.update({
      where: {id: id},
      data: {
        [list]: newList
      }
    });
    return newList;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const deleteToTheList = async (id: string, list: string, mangaId: number, userList: number[]) => {
  try {
    if (userList.length === 0) return [];
    let newList= userList.filter(manga => manga !== mangaId);
    await db.user.update({
      where: {id: id},
      data: {
        [list]: newList
      }
    });
    return newList;
  } catch (error: any) {
    throw new Error(error.message);
  }
};