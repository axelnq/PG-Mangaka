import { db } from "../app";
import Manga from "../classes/Manga";

<<<<<<< HEAD
export default async function paginated(numPaged: number): Promise<[Manga[], number]> {
    let mangas: Manga[] = [];
    let mangasPerPage: number = 25;
    let totalMangas: number = await db.manga.count();
    let totalPages: number = Math.ceil(totalMangas / mangasPerPage);
    let page: number = numPaged;
    if (page > totalPages) throw new Error("Page not found");
    let offset: number = (page - 1) * mangasPerPage;
    let mangasPaginated: Manga[] = await db.manga.findMany({
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
            rating: "desc"
        }
    });
    mangas = mangasPaginated;
    return [mangas, totalPages];
}
=======
export default async function paginated(
  numPaged: number
): Promise<[Manga[], number]> {
  let mangas: Manga[] = [];
  let mangasPerPage: number = 25;
  let totalMangas: number = await db.manga.count();
  let totalPages: number = Math.ceil(totalMangas / mangasPerPage);
  let page: number = numPaged;
  if (page > totalPages) throw new Error("Page not found");
  let offset: number = (page - 1) * mangasPerPage;
  let mangasPaginated: Manga[] = await db.manga.findMany({
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
      rating: "desc",
    },
  });
  mangas = mangasPaginated;
  return [mangas, totalPages];
}
>>>>>>> e793438bab02d09fbacb522d9e0e0b7d2fc9c778
