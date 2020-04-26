import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'

class Home extends Component {
    state = {}

    getInfo = () => {
        axios.get(`/`)
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

    render() { 
        return ( 
            <>
                <button onClick={this.getInfo}>Get Info</button>
                {this.state.data}

            </>
         );
    }
}
 
export default withRouter(Home);