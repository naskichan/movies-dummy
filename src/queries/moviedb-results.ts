import { MovieDbResult } from "../entities/moviedb.entity";
import { MovieDbService } from "../helpers/moviedb.service";

const movieDbService = new MovieDbService();

export const fetchMovieDbResults = async (query: string): Promise<MovieDbResult[]> => {
    return await movieDbService.searchMovie(query);
}