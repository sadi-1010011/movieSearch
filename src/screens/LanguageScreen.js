import { useState } from 'react';
import { Link } from 'react-router-dom';
import NextBtn from './../components/NextBtn'
import CustomOption from './../components/CustomOption';
import './LanguageScreen.css';

const LanguageScreen = () => {

  
  const languageIDs = {
    Arabic: 'ar', chinese: 'zh', english: 'en', french: 'fr', german: 'de', hindi: 'hi', japanese: 'ja', korean: 'ko', malayalam: 'ml', persian: 'fa', russian: 'ru', tamil: 'ta', telugu: 'te', turkish: 'tr', urdu: 'ur'
  };

  const [selectedlangg, setselectedlangg] = useState([]);

  const getLangg = (langg, element) => {
    element.classList.add('selected');
    // save by ISO 639-1 standard codes
    let updatedList = [...selectedlangg, languageIDs[langg]];
    // remove repeating selection by set convertion hack
    updatedList = [...new Set(updatedList)];
    console.log(updatedList);
    setselectedlangg( updatedList );
  }

  let data = selectedlangg[selectedlangg.length-1];
  const languageKeys = Object.keys(languageIDs);

  return (
    <div className="language-screen">
      <h1 className="page-title">choose languages</h1>
      <div className="langg-pref-wrapper">
        {
          languageKeys.map((langg, i) => <CustomOption key={i} val={langg} getVal={ getLangg } />)
        }
      </div>
      <Link to="/genre"  state={{ language: data }}>
        <NextBtn bottom="5vh" right="5vh" activeColor={ selectedlangg.length > 0 ? '#7dddf4' : 'rgb(176, 190, 206)' } />
      </Link>
    </div>
  );
}

export default LanguageScreen;