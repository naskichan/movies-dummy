import { Movie, FirebaseMovie } from "../entities/movie.entity";

export class MovieMapper {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toEntity(uuid: string, firebaseMovie: FirebaseMovie): Movie {
        return {
            uuid: uuid,
            title: firebaseMovie.title,
            overview: firebaseMovie.overview,
            cover: firebaseMovie.cover,
            watched: firebaseMovie.watched,
            link: firebaseMovie.link,
            membersWantingToWatch: firebaseMovie.membersWantingToWatch,
            dateAdded: new Date(firebaseMovie.dateAdded),
            rating: firebaseMovie.rating,
        }
    }
    toDbModel(movie: Movie): FirebaseMovie {
        return {
            title: movie.title,
            overview: movie.overview,
            cover: movie.cover,
            watched: movie.watched,
            link: movie.link,
            membersWantingToWatch: movie.membersWantingToWatch,
            dateAdded: movie.dateAdded.toISOString(),
            rating: movie.rating,
        }
    }
}