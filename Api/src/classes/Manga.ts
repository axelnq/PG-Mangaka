import User from "./User";

enum State {
  Finished,
  on_going,
  on_pause,
}

export default class Manga {
  id: number | undefined;
  title: string;
  synopsis: string;
  image: Buffer;
  genre: string[];
  rating: number;
  state: string;
  authorId: string;
  chapter: number;
  chapters?: number[] | undefined;

  constructor(
    title: string,
    synopsis: string,
    image: Buffer,
    genre: string[],
    authorId: string,
    rating?: number,
    chapter?: number,
    chapters?: number[],
    state?: string,
    id?: number
  ) {
    this.title = title;
    this.synopsis = synopsis;
    this.image = image;
    this.genre = genre;
    this.rating = rating || 0;
    this.state = state || "on_going";
    this.id = id || undefined;
    this.authorId = authorId;
    this.chapter = chapter || 0;
    this.chapters = chapters || undefined;
  }
}

export function setTitle(manga: Manga, title: string): void {
  manga.title = title;
}

export function setSynopsis(manga: Manga, synopsis: string): void {
  manga.synopsis = synopsis;
}

// export function setCover(manga: Manga, coverimage: string): void {
//   manga.images[0] = coverimage;
// }

// export function setBackCover(manga: Manga, backImage: string): void {
//   manga.images[1] = backImage;
// }

export function setRating(manga: Manga, rating: number): void {
  manga.rating = rating;
}
/*
export function setState(manga: Manga, state: State): void {
    switch (state) {
        case (State.Finished):
            manga.state = State.Finished;
            break;
        case (State.on_going):
            manga.state = State.on_going;
            break;
        case (State.on_pause):
            manga.state = State.on_pause;
            break;
        default:
            break;
    }
}
*/
