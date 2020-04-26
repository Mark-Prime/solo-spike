import React, { Component } from 'react';

class Login extends Component {
    
    componentDidMount() {

    }

    render() { 
        return ( 
            <>
                <h2>Welcome! Please log in.</h2>
                <p><a href="http://localhost:5000/auth/steam">Sign On with Steam</a></p>
            </>
         );
    }
}
 
export default Login;