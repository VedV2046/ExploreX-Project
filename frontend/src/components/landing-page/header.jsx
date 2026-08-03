import React from "react";
import logo from "../../assests/explorex_logo2.png";

function Header({ onHome, onDiscover }) {
    return(
        <div className="header">
            <div className="brand">
                <img className="logo" src={logo} alt="exploreX logo"></img>
                <a href="/" style={{textDecoration: "none", color: "#D0BCFF"}}><h1>ExploreX</h1></a>
            </div>
            <div className="links">
                <button type="button" className="link-button" onClick={onHome}>Home</button>
                <button type="button" className="link-button" onClick={onDiscover}>Discover</button>
                <button type="button" className="link-button" onClick={onHome}>Favourites</button>
            </div>
        </div>
    );
}

export default Header; 