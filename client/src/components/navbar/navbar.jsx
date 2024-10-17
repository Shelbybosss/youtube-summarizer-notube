import "./navbar.css";

function Navbar () {

    //code for navbar

    return(
        <>
           <div className="navbar">

                <div className="navbar-left">
                    <img src="src\assets\robot-man_3273805.png"></img>
                    <p>NO-TUBE</p>
                </div>

                <div className="navbar-right">
                    <ul>
                        <a href="./home"><li>HOME</li></a>
                        <a href="./app"><li>APP</li></a>
<<<<<<< HEAD
                        <a href="./voice">VOICE</a>
=======
>>>>>>> 86b5554bdef2e86e5290a71c7f0c1159f9fa9372
                        <a href="./login"><li>LOGIN</li></a>
                        <a href="./about"><li>ABOUT</li></a>

        
                    </ul>
                </div>
           </div>

        </>
    );
}

export default Navbar;