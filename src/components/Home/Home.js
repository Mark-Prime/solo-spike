import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'

class Home extends Component {
    state = {}

    getInfo = () => {
        axios.get(`/user`)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    data: response.data
                })
            }).catch((error) => {
                alert('Bad things happened...')
                console.log('Error in get /auth/steam', error)
            })
    }

    componentDidMount() {
        this.getInfo()
    }

    render() { 
        return ( 
            <>
                {this.state.data ?
                    <div>
                        {JSON.stringify(this.state.data)}
                        <h2>{this.state.data._json.personaname}</h2> 
                        <img src={this.state.data._json.avatarfull} alt='profile'></img>
                        <a href="http://localhost:5000/logout">LOGOUT</a>
                    </div> :
                 <a href="/#/login">LOGIN</a>}

            </>
         );
    }
}
 
export default withRouter(Home);