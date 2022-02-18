import { db } from "../app"

export const addToTheList = async (id: string, list: string, mangaId: number) => {
  try {
    let mangasList: any = await db.user.findUnique({
      where: {id: id},
      select: {
        [list] : true
      }
    });
  
    let updateList = await db.user.update({
      where: {id: id},
      data: {
        [list]: [...mangasList[list], mangaId]
      }
    });
    return updateList;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const deleteToTheList = async (id: string, list: string, mangaId: number) => {
  try {
    let mangasList: any = await db.user.findUnique({
      where: {id: id},
      select: {
        [list] : true
      }
    });

    if (mangasList[list].length === 0) return []

    let updateList:any = await db.user.update({
      where: {id: id},
      data: {
        [list]: mangasList[list].filter( (id: number) => id !== mangaId)
      }
    });
    return updateList[list];
  } catch (error: any) {
    throw new Error(error.message);
  }
};