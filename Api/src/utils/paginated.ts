import { db } from "../app";
import Manga from "../classes/Manga";

let mangasPerPage = 8;
export async function paginated(
  numPaged: number = 1,
  order: string = "asc",
  tag: string = "createdAt",
  filter: string[] = []
): Promise<[Manga[], number, number]> {
  let mangas: Manga[] = [];
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
        active:true,
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

export async function paginatedByAuthor(numPaged: number, author: string): Promise<[Object[], number, number]> {
  try {
    var searchResults = await db.user.findMany({
      where: {
        name: {
          contains: author,
          mode: "insensitive",
        },
      },
      select: {
        name: true,
        created: true,
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
  let mangasByAuthor: any = [];
  searchResults.forEach((elto) =>
  elto.created?.forEach((manga: any) =>
    mangasByAuthor.push({
      id: manga.id,
      title: manga.title,
      synopsis: manga.synopsis,
      authorId: manga.authorId,
      image: manga.image,
      createdAt: manga.createdAt,
      uptadedAt: manga.uptadedAt,
      genre: manga.genre,
      rating: manga.rating,
      chapter: manga.chapter,
      state: manga.state,
      author: {
        name: elto.name,
      },
    })
  )
);
  let totalMangas = mangasByAuthor.length;
  if(totalMangas == 0) throw new Error("Authors not found");
  let totalPages: number = Math.ceil(totalMangas / mangasPerPage);
  let page: number = numPaged;
  if (page > totalPages) throw new Error("Page not found");
  let offset: number = (page - 1) * mangasPerPage;
  let mangas: Object[] = [];
  mangas = mangasByAuthor.slice(offset, offset + mangasPerPage);
  return [mangas, totalPages, totalMangas];

}
