import "./login.css";
import React from "react";



function Login () {



    return (
       

        <div className="Main">
            <div className="innerleft">

                <div className="innerleft-inner">


                    <div>
                        <h1>Youtube Summarizer</h1>
                    </div>
                    

                    <div>
                        <h1>Hey There!</h1>
                        
                        <p>Welcome Back. <br></br>you are one step closer to using the Youtube Summarizer, and perapre for exams!</p>
                    </div>

                    <div>
                        <p>Dont have an account?</p>
                        <button className="signupbtn">Sign Up</button>
                    </div>

                </div>
            </div>

            <div className="innerright">

                <div className="innerright-inner">


                        <div>
                            <h1>
                                Sign IN
                            </h1>
                        </div>

                        <div className="form">

                            <form method="post" action="./login.jsx">
                                
                                <label>Email</label><br></br>
                                <input type="email" placeholder="Enter Email Id" className="input"></input><br></br>
                                <br></br>
                                <label>Password</label><br></br>
                                <input type="password" placeholder="Enter Password" className="input"></input><br></br>
                                <br></br>
                                <div className="checkboxdiv">
                                <input type="checkbox" className="checkbox"></input>
                                <label className="checkboxtext">    Keep me Logged in</label>
                                </div>
                                <br></br>

                                
                                <button className="signinbtn">Sign In</button>
                               
                                

                                <div className="loginwithsocialmedia">

                                    <div>
                                        <h2>Or, Login with Google</h2>
                                    </div>

                                    <div className="socialmediaicons">
                                        <a href="#"><img src="src\assets\search.png"></img></a>
                                    </div>

                                </div>

                                
                            </form>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Login;