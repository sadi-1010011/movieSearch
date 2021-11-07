import './MovieCard.css';

const MovieCard = ({ movieData, voteMovie }) => {
    
    // console.log('> plotting movie info');
    // console.table(movieData);

    if(typeof movieData !== 'object') return <h2>no data..</h2>;

    const { poster_path, title, vote_average, runtime, release_date, adult, popularity } = movieData;
    
    const moviePosterLink = `https://image.tmdb.org/t/p/w300/${poster_path}` || '';
    // let NA = 'N/A';
    let NA = <span style={{ color:'red' }}>N/A</span>;

    return (
        <div className="movie-container">
            <img className="moviePoster" src={moviePosterLink ? moviePosterLink : NA} alt="poster" />
            <h2 className="movieName">{ title }</h2>
            { vote_average ? <span className="movieInfo">{ `rating: ${ vote_average }` }</span> : NA }
            { runtime ? <span className="movieInfo">{ ` dur: ${ runtime }` }</span> : NA }
            { release_date ? <span className="movieInfo">{ `release date: ${ release_date }` }</span> : NA }
            <span className="movieInfo">{ `adult: ${ adult }` }</span>
            { popularity ? <span className="movieInfo">{ `popularity: ${ popularity }` }</span> : NA }
            <button id="voteBtn" className="customBtn" onClick={ voteMovie }>vote</button>
        </div>
    );
}

export default MovieCard;