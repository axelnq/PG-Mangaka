import Manga from '../classes/Manga';

// La funcion Filters debe recibir el parametro "filter" con su primer letra en mayuscula.
export function filters(mangas:Manga[], filter:string):{}[] {
    let filteredMangas:Manga[] = [];
    if (filter === 'all') {
        filteredMangas = mangas;
    } else {
        filteredMangas = mangas.filter((manga ) => {
            return manga.genre.includes(filter);
        });
    }
    return filteredMangas;
};

// filtro por stado dentro
// filtro por capitulo si está finalizado si es largo 201 en adelante, corto 1 a 100 , mediano 101 a 200

export function filterState(mangas:Manga[], filter:string, length?:string):any {
    let mangasByState: Manga[] = [];
    if (filter === "all") {
        mangasByState = mangas;
    } else if (filter === "finished") {
        // if (!length) {
        //     mangasByState = mangas.filter(manga => manga.state === "finished")
        // } else if (length === "short") {
        //     mangasByState = mangas. filter(manga => {
        //         return manga.state === "finished" && (manga.chapters && manga.chapters.length <= 100);
        //     })
        // } else if (length === "medium") {
        //     mangasByState = mangas.filter(manga => {
        //         return manga.state === "finished" && (manga.chapters && manga.chapters.length > 100 && manga.chapters.length <= 200);
        //     })
        // } else {
        //     mangasByState = mangas.filter(manga => {
        //         return manga.state === "finished" && (manga.chapters && manga.chapters.length > 200);
        //     })
        // }

        switch (length) {
            case "short":
                mangasByState = mangas.filter(manga => {
                    return manga.state === "finished" && (manga.chapter && manga.chapter <= 100);
                });
                break;
            case "medium":
                mangasByState = mangas.filter(manga => {
                    return manga.state === "finished" && (manga.chapter && manga.chapter > 100 && manga.chapter <= 200);
                });
                break;
            case "long":
                mangasByState = mangas.filter(manga => {
                    return manga.state === "finished" && (manga.chapter && manga.chapter > 200);
                });
                break;
            default:
                mangasByState = mangas.filter(manga => manga.state === "finished");
                break;
        }
    } else {
        mangasByState = mangas. filter(manga => manga.state === filter)
    }
    return mangasByState;
}