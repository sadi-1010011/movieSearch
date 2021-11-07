import './NextBtn.css';

const NextBtn = ({bottom, right, activeColor}) => {
    return <span id="nextBtn" style={{bottom: bottom, right: right, backgroundColor: activeColor}}></span>
}

export default NextBtn;