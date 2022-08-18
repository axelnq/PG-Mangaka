import Manga from '../classes/Manga';


export function sort(mangas:Manga[], order:string, tag:string):Manga[] {
    let sortMangas:Manga[] = [...mangas];
    let typeKey = tag as keyof Manga;
    // si type se puede castear a la interface;
    sortMangas.sort(function (a, b) {

        if (a[typeKey]!  > b[typeKey]!) {
            return order === 'asc' ? 1 : -1;
        }
       
        if (a[typeKey]! < b[typeKey]!) {
            return order === 'asc' ? -1 : 1;
        }
        return 0;

    })
    
  
    return sortMangas;
}   


