export interface Movie {
    uuid: string,
    title: string,
    overview: string,
    cover: string,
    watched: boolean,
    link: string,
    watchCount: number,
    dateAdded: Date,
}

export interface FirebaseMovie {
    title: string,
    overview: string,
    cover: string,
    watched: boolean,
    link: string,
    watchCount: number,
    dateAdded: string,
}