import Manga from './Manga';

export default class Chapter {
    id: number | undefined;
    title: string;
    images: string[];
    points: number;
    mangaId: number;
    usersId: string[];
    active: boolean;

    constructor(title: string,images: string[],mangaId:number, active?:boolean,points?: number,usersId?: string[],id?:number) {
        this.title = title;
        this.images = images;
        this.points = points || 0;
        this.active = active || true;
        this.mangaId = mangaId;
        this.usersId = usersId || [];
        this.id = id || undefined;
    }

}
// change folder classes
export function setTitle(chapter: Chapter, title: string): void {
    chapter.title = title;
}

export function setImages(chapter: Chapter, images: string[]): void {
    chapter.images = [...chapter.images, ...images]
}

// averiguar para guardar tanto el usuario que vota con su valor para despues buscarlo y reemplazar si vota de nuevo.
export function setPoints(chapter:Chapter, points:number,userId:string):void {
    if(!(chapter.usersId.includes(userId))){
        chapter.points += points;
        chapter.usersId.push(userId);
    }
}

export function getRatingChapter(chapter:Chapter):number {
    
    let numbersOfUsers:number = chapter.usersId.length;

    let mediaRating:number = chapter.points/numbersOfUsers;
    
    return mediaRating;
}

export function setActive(chapter: Chapter, active: boolean): void {
    chapter.active = active;
  }

