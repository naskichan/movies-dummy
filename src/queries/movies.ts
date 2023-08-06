import { Movie } from "../entities/movie.entity";
import { FireBaseService } from "../helpers/firebase.service";

const firebaseService = new FireBaseService();

export const fetchMovies = async (): Promise<Movie[]> => {
    const movies = await firebaseService.findMovies();
    return movies;
}

export const addMovie = async (movie: Movie): Promise<void> => {
    await firebaseService.addMovie(movie);
}

export const updateMovie = async (movie: Movie): Promise<void> => {
    await firebaseService.updateMovie(movie);
}
