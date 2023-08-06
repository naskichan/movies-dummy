export interface Movie {
    uuid: string,
    title: string,
    overview: string,
    cover: string,
    watched: boolean,
    link: string,
    membersWantingToWatch: string[],
    dateAdded: Date,
    rating: number,
}

export interface FirebaseMovie {
    title: string,
    overview: string,
    cover: string,
    watched: boolean,
    link: string,
    membersWantingToWatch: string[],
    dateAdded: string,
    rating: number,
}