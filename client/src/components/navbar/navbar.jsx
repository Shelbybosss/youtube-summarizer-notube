import "./navbar.css";
import React from "react";

function Navbar () {

    //code for navbar

    return(
        <>
            <div className="navbar">
                
                <div className="Heading">
                    <img src="src\assets\technology.png" alt="icon"></img>
                    <h1>Summarized</h1>
                </div>

                <div className="left"><a href="#"><h2>Home</h2></a></div>
                <div className="left"><a href="#"><h2>App</h2></a></div>
                <div className="left"><a href="#"><h2>Get Extension</h2></a></div>
                <div className="left"><a href="#"><h2>About</h2></a></div>
                <div className="left"><a href="#"><h2>Contact Us</h2></a></div>
                <div className="socialmedia left">
                    <img src="src\assets\X.png" alt="socialmedia"></img>
                    <img src="src\assets\linkedinneww.png" alt="socialmedia"></img>
                    <img src="src\assets\instagram.png" alt="socialmedia"></img>
                </div>

            </div>

        </>
    );
}

export default Navbar;