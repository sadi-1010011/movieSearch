import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// All Screens
import LanguageScreen from '../screens/LanguageScreen';
import GenreScreen from '../screens/GenreScreen';
import VoteScreen from '../screens/VoteScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import NotFound from '../screens/NotFound';
import './App.css';


function App() {  
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <LanguageScreen/> } />
        <Route path='/genre' element={ <GenreScreen/> } />
        <Route path='/vote' element={ <VoteScreen/> } />
        <Route path='/leaderboard' element={ <LeaderboardScreen/> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;