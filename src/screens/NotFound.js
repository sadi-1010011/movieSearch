import React from "react";
import { Link } from "react-router-dom";
import NextBtn from "../components/NextBtn";

const NotFound = () => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h1>404</h1>
            <Link to="/">
                <NextBtn bottom="5vh" right="5vw" activeColor="#7dddf4" />
            </Link>
        </div>
    );
}

export default NotFound;