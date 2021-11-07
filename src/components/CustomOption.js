import './CustomOption.css';

const CustomOption = ({val, getVal}) => {
    return (
        <div className="custom-option" onClick={ (e) =>  getVal(val, e.target)}>
            { val }
        </div>
    );
}

// onClick={ }

export default CustomOption;