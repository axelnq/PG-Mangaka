import Manga from "./Manga";

export default class Chapter {
  id: number | undefined;
  title: string;
  coverImage: Buffer;
  images: Buffer[];
  points: number;
  mangaId: number;
  price: number;
  usersId: string[];

  constructor(
    title: string,
    images: Buffer[],
    coverImage: Buffer,
    price: number,
    mangaId: number,
    points?: number,
    usersId?: string[],
    id?: number
  ) {
    this.title = title;
    this.coverImage = coverImage;
    this.images = images;
    this.price = price;
    this.points = points || 0;
    this.mangaId = mangaId;
    this.usersId = usersId || [];
    this.id = id || undefined;
  }
}
// change folder classes
export function setTitle(chapter: Chapter, title: string): void {
  chapter.title = title;
}

// export function setImages(chapter: Chapter, images: Buffer): void {
//     chapter.images = [...chapter.images.to, ...images]
// }

// averiguar para guardar tanto el usuario que vota con su valor para despues buscarlo y reemplazar si vota de nuevo.
export function setPoints(
  chapter: Chapter,
  points: number,
  userId: string
): void {
  if (!chapter.usersId.includes(userId)) {
    chapter.points += points;
    chapter.usersId.push(userId);
  }
}

export function getRatingChapter(chapter: Chapter): number {
  let numbersOfUsers: number = chapter.usersId.length;

  let mediaRating: number = chapter.points / numbersOfUsers;

  return mediaRating;
}
