import './LeaderBar.css';

const LeaderBar = ({ children }) => {
    return (
        <div className="leaderBar">
            {children}
        </div>
    );
}

export default LeaderBar;