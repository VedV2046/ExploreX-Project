import React from "react";
import logo from "../../assests/explorex_logo.png";

function Header() {
    return(
        <div className="header">
            <div className="brand">
                <img className="logo" src={logo} alt="exploreX logo"></img>
                <h1>ExploreX</h1>
            </div>
            <div className="links">
                <h3>Home</h3>
                <h3>Discover</h3>
                <h3>Favourites</h3>
            </div>
        </div>
    );
}

export default Header; 