import firebase from "firebase/compat/app"
import { Movie } from "../entities/movie.entity"
import { get, getDatabase, ref, set } from "firebase/database";
import { MovieMapper } from "../mapper/movie.mapper";
import { v4 as uuid } from 'uuid';


export class FireBaseService {
    constructor() {}
    firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: 'movie-dummy.firebaseapp.com',
        projectId: 'movie-dummy',
        storageBucket: 'movie-dummy.appspot.com',
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
        databaseURL: 'https://movie-dummy-default-rtdb.europe-west1.firebasedatabase.app',
    }
    firebaseApp: firebase.app.App = firebase.initializeApp(this.firebaseConfig);
    db = getDatabase(this.firebaseApp);
    mapper = new MovieMapper();

    getFirebaseApp(): firebase.app.App {
        return this.firebaseApp;
    }

    async addMovie(movie: Movie): Promise<void> {
        console.log('adding movie', movie);
        const dbRef = ref(this.db,`movies/${uuid()}`);
        const dbModel = this.mapper.toDbModel(movie);
        console.log('writing to db', dbModel)
        set(dbRef, dbModel);
    }

    async findMovies(): Promise<Movie[]> {
        const dbRef = ref(this.db, 'movies');
        const snapshot = await get(dbRef);
        const values = snapshot.val();
        return Object.keys(values).map((key) => {
            return this.mapper.toEntity(key, values[key]);
        })
    }

    async updateMovie(movie: Movie): Promise<void> {
        const dbRef = ref(this.db,`movies/${movie.uuid}`);
        const dbModel = this.mapper.toDbModel(movie);
        set(dbRef, dbModel)
    }
}
