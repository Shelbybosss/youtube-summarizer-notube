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
                        <a href="./voice"><li>VOICE</li></a>
                        <a href="./fileselect"><li>UPLOAD FILE</li></a>
                        <a href="./login"><li>LOGIN</li></a>
                        <a href="./about"><li>ABOUT</li></a>
                        

        
                    </ul>
                </div>
           </div>

        </>
    );
}

export default Navbar;