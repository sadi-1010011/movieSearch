import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomOption from '../components/CustomOption';
import NextBtn from './../components/NextBtn'
import './GenreScreen.css';

const GenreScreen = () => {

    // get langg data from previous page

    const location = useLocation();
    const { language } = location.state;

    const genreIDs = {
        action: 28, adventure: 12, animation: 16, comedy: 35, crime: 80, drama: 18, family: 10751, fantasy: 14, horror: 27, mystery: 9648, romance: 10749, scifi: 878, thriller: 53
    };

    const [selectedgenre, setselectedgenre] = useState([]);

    const getGenre = (genre, element) => {
        element.classList.add('selected');
        // save genre ID only
        let updatedList = [...selectedgenre, genreIDs[genre]];
        // remove repeating selection by - set convertion hack
        updatedList = [...new Set(updatedList)];
        console.log(updatedList);
        setselectedgenre( updatedList );
    }


    let finalGenre = selectedgenre[selectedgenre.length-1];
    let data = { language, genre: finalGenre };

    const genreKeys = Object.keys(genreIDs);

    return (
        <div className="genre-screen">
            <h1 className="page-title">choose genre</h1>
            <div className="genre-pref-wrapper">
                {
                    genreKeys.map((key, i) => <CustomOption key={i} val={key} getVal={ getGenre } />)
                }
            </div>
            <Link to="/vote" state={{ data }}>
                <NextBtn bottom="5vh" right="5vh" activeColor={ selectedgenre.length > 0 ? '#7dddf4' : 'rgb(176, 190, 206)' } />
            </Link>
        </div>
    );
}

export default GenreScreen;