import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import Axios from 'axios';

export default class PrivateRouter extends Component{
    constructor(props) {
        super(props);
        this.state={
            isAllow: !!localStorage.loginData,
            isRequest: !!localStorage.loginData,
        }
        if (localStorage.loginData) {
            const data = JSON.parse(localStorage.loginData);
            Axios.post('http://209.190.98.244:5000/auth/login',data)
            .then(response=>{
                this.setState({
                    isAllow : response.data.success,
                    isRequest : false
                })
            })
        }
    }

    render() {
        const {path,component} = this.props;
        const {isAllow,isRequest} = this.state;
        if (isRequest) {
            return <p>Waiting ...</p>
        }
        if (isAllow){
            return <Route path={path} component={component}/>
        }
        return <Redirect to="login"/>
    }
}