import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import './VoteScreen.css';

const VoteScreen = () => {

    // previous page data of langg and genre
    const location = useLocation();
    const { data } = location.state;

    // MOVIE VARIABLES :)
    const [fetchedMovieData, setFetchedMovieData] = useState({
        movieList: {},
        initialMovies: [],
        nextMovieData: {},
        votedMovieData: {},
        voteList: [],
        movieIndex: 1, // not zero bcz of initialmovies
        page: 1,
        upVoted: '',
        downVoted: '',
        anyErrors: '',
    });

    // effect as componentDidMount

    useEffect(() => {
        // destructure result and setstate list of movies
        getMovieData().then(response => {                
            // contains 20 movies
            const movieInfoFull = response.data.results;
            console.log('fetched_movies: ',movieInfoFull.length); // check if 20 movies available - soon update

            setFetchedMovieData({ // set 20 movieslist, reset other values
                ...fetchedMovieData,
                movieList: movieInfoFull,
                initialMovies: [movieInfoFull[0], movieInfoFull[1]],
                nextMovieData: {},
                movieIndex: 1,
            });

        }).catch(error => {
            // error handling here
            console.log(error.message);
            // insert error msg to state
            setFetchedMovieData({
                ...fetchedMovieData,
                anyErrors: error.message,
            });
        });
            // re-run on page update, bring's next page
    }, [fetchedMovieData.page]);


    // effect as componentDidUpdate

    useEffect(() => {
        // console.log('>  component updated !');
        const { movieList, movieIndex } = fetchedMovieData;

        // does state has movies fetched ?
        if(movieList) {
            // console.log('  >  movieList available');
            console.log('showing movie ',movieIndex);

            // update next movie to draw data from
            setFetchedMovieData({
                ...fetchedMovieData,
                nextMovieData: movieList[movieIndex],
            });
        }
        // run on every update of movie list or index
    }, [fetchedMovieData.movieList, fetchedMovieData.movieIndex]);


    // THE fn to bring data from the movie database -tmdb

    const getMovieData = () => {
        // console.log('data: ',data);
        // API SETUP
        const api_key = '08d7db24695193b7c6dbdac9d5ac3933'; // MY_KEY to be hided - sooner
        const language = data.language || 'en-US'; // defaults to english 
        const genre = data.genre || '27'; // dafault to horror
        const page = fetchedMovieData.page; // from state - bcz its dynamic
        // THE formatted URL..
        const baseURL = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=${language}&sort_by=popularity.desc?&include_video=false&page=${page}&with_genre=${genre}`;

        // outputs 1 page of 20 movies object array
        return axios.get(baseURL);
    }

    const finishVoting = (voteListObj) => {
        console.log('finished');
        console.log(voteListObj);
        // to be set up next !
    }

    const voteMovie = (AorB, votedMovieObj) => {
        // console.log(`voted: ${AorB} - ${votedMovieObj.title} - obj: ${votedMovieObj}`);
        let { nextMovieData, movieIndex, votedMovieData, upVoted, downVoted, voteList, page, initialMovies } = fetchedMovieData;
        let votelistRow;

        if (initialMovies)
            // get first two movies name
            votelistRow = { A: initialMovies[0].title, B: initialMovies[1].title};

        if (movieIndex > 0) {
            initialMovies = null; // space for improvement in next update
            upVoted = AorB;
            downVoted = AorB === 'A' ? 'B' : 'A'; // invert it
            votedMovieData = votedMovieObj;
            if (!votelistRow) {
                votelistRow = { A: voteList[voteList.length - 1].result, B: nextMovieData.title, result: votedMovieObj.title };
            } else votelistRow = {...votelistRow, result: votedMovieObj.title};
            voteList.push(votelistRow);
            console.log(`upVoted: ${upVoted}, downVoted: ${downVoted}, full vote list --`);
            // console.table(voteList);
        }

        // update next movies state value
        setFetchedMovieData({
            ...fetchedMovieData,
            movieIndex: movieIndex + 1,
            initialMovies,
            upVoted,
            downVoted,
            votedMovieData,
            voteList,
            page: movieIndex >= 19 ? page + 1 : page,
        });
    }

    const { anyErrors, movieIndex, nextMovieData, downVoted, votedMovieData, initialMovies } = fetchedMovieData;

    // A HACK to fix logic

    const movieDataA = (movieIndex > 1) ? (downVoted === 'A' ? nextMovieData : votedMovieData) : initialMovies[0];
    const movieDataB = (movieIndex > 1) ? (downVoted === 'B' ? nextMovieData : votedMovieData) : initialMovies[1];

    return (
        <div className="vote-screen">
            <h1 className="page-title">vote screen</h1>
                {
                    anyErrors ? ( // if errors -
                        <div className="movie-wrapper">
                            <h2 className="color-white">{ anyErrors }..</h2>
                        </div>
                        ) : 
                    nextMovieData ? ( // else data available -
                        <div className="movie-wrapper">
                            <MovieCard movieData={ movieDataA } voteMovie={ () => voteMovie('A', movieDataA) } />
                            <MovieCard movieData={ movieDataB } voteMovie={ () => voteMovie('B', movieDataB) } />
                        </div>
                        ) : ( // data loading -
                        <div className="movie-wrapper">
                            <h2 className="color-white">loading..</h2>
                        </div>
                    ) // simple isnt it 
                }
            <Link to="/leaderboard" state={{ data: fetchedMovieData.voteList }}>
                <button id="finishBtn" className="customBtn" onClick={ () => finishVoting(fetchedMovieData.voteList) }>finish</button>
            </Link>
        </div>
    );
}

export default VoteScreen;


// ! MOST OF THE CONSOLE LOGS YOU SEE HERE AND THERE ARE THE INVISIBLE EFFORTS MADE BY THE DEVELOPERS, WHICH ARE ERASED MODIFIED UPDATED AND CLEANED LEFTOVER LOGS, LIKE 100 WRONG ROADS : 6 RIGHT ONES : SINGLE BEST SOLUTION !