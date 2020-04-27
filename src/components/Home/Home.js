import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'

class Home extends Component {
    state = {
        data: ''
    }

    getInfo = () => {
        axios.get(`/user`)
            .then((response) => {
                if (response.data._json) {
                    console.log(response.data)
                    this.setState({
                        data: response.data
                    })
                } else {
                    this.props.history.push('/login')
                }
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
                {this.state.data._json &&
                    <div>
                        <h2>{this.state.data._json.personaname}</h2> 
                        <img src={this.state.data._json.avatarfull} alt='profile'></img>
                        <a href="http://localhost:5000/logout">LOGOUT</a>
                    </div>}
            </>
         );
    }
}
 
export default withRouter(Home);