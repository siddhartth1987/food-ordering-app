import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './home/Home';
import Profile from './profile/Profile';

// Controller class for routing to various pages.
class Controller extends Component{
    constructor(){
        super()
        this.baseUrl = "http://localhost:8080/api/"
    }

    render(){
        return(
            <Router>
                <div className = 'main-container'>

                    {/* Home Page */ }
                    <Route exact path = '/' render={(props) => <Home {...props} baseUrl = {this.baseUrl}/>}/>

                    {/* Profile Page */}
                    <Route path='/profile' render={(props) => <Profile {...props} baseUrl={this.baseUrl} />} />

                </div>
            </Router>

        )
    }

}

export default Controller;