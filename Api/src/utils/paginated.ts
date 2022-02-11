import { db } from "../app";
import Manga from "../classes/Manga";

export default async function paginated(
  numPaged: number = 1,
  order: string = "asc",
  tag: string = "createdAt",
  filter: string[] = []
): Promise<[Manga[], number, number]> {
  let mangas: Manga[] = [];
  let mangasPerPage: number = 8;
  let totalMangas: number = await db.manga.count({
    where: {
      genre: {
        hasEvery: filter,
      },
    },
  });
  let totalPages: number = Math.ceil(totalMangas / mangasPerPage);
  let page: number = numPaged;
  if (page > totalPages) throw new Error("Page not found");
  let offset: number = (page - 1) * mangasPerPage;
  try {
    mangas = await getMangas(mangasPerPage, offset, order, tag, filter);
  } catch (e: any) {
    throw new Error(e.message);
  }
  return [mangas, totalPages, totalMangas];
}

async function getMangas(
  mangasPerPage: number,
  offset: number,
  order: string,
  tag: string,
  filter: string[]
): Promise<Manga[]> {
  let mangasPaginated: Manga[] = [];
  try {
    //@ts-ignore
    mangasPaginated = await db.manga.findMany({
      take: mangasPerPage,
      skip: offset,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        [tag]: order,
      },
      where: {
        genre: {
          hasEvery: filter,
        },
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
  return mangasPaginated;
}
