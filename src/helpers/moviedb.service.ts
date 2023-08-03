import axios from "axios";
import { MovieDbResult } from "../entities/moviedb.entity";

export class MovieDbService {
    constructor () {}
    axiosInstance = axios.create({
        baseURL: 'https://api.themoviedb.org/3',
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_API_KEY}`,
        }
    });
    async searchMovie(query: string): Promise<MovieDbResult[]> {
        console.log(`Fetching results for ${query}`);
        const result = await this.axiosInstance.get('search/movie', {
            params: {
                query
            }
        })
        return result.data.results;
    }
}