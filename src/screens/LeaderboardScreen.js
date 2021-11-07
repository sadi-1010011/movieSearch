import { Link, useLocation } from 'react-router-dom';
import NextBtn from '../components/NextBtn';
import LeaderBar from '../components/LeaderBar';
import './LeaderboardScreen.css';

const LeaderboardScreen = () => {

    // data from vote page
    const location = useLocation();
    const { data } = location.state;

    // const voteKeys = Object.keys(data);
    // console.log(voteKeys)

    return (
        <div className="leaderboard-screen">
            <h1 className="page-title">leaderboard screen</h1>
            <div className="leaderboard-wrapper">
                {
                    data.map((votes, i) => <LeaderBar key={i}>
                        {
                            Object.keys(votes).map((vote, j) => (
                                    <div key={j}>
                                        <span>{ votes[vote] }</span>
                                    </div>
                                )
                            )
                        }
                    </LeaderBar>)
                }
            <Link to="/">
                <NextBtn bottom="5vh" right="5wh" activeColor="#7dddf4"/>
            </Link>
            </div>
        </div>
    );
}

export default LeaderboardScreen;