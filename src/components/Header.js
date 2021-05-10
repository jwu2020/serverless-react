import React  from "react";
import AppBar from "@material-ui/core/AppBar";



function Header() {
    return (
        <AppBar position="static" >
            <div className="navContainer">
                <h1>
                    SnackPoll
                </h1>
            </div>
        </AppBar>
    );
}


export default Header;