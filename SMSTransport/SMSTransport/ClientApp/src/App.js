import React, { Component } from 'react';
import { Menu } from './components/Menu';
import { Route, Switch } from "react-router-dom";
import { Dashboard } from './components/Dashboard';
import { FetchData } from './components/FetchData';
import { Driver } from './components/Driver';
import 'react-notifications/lib/notifications.css';


export default class App extends Component {
    displayName = App.name;
    render() {
        return (
            <React.Fragment>
                <Menu />
                <Switch>
                    <Route path='/dashboard' component={Dashboard} />
                    <Route path='/fetchdata' component={FetchData} />
                    <Route path='/driver' component={Driver} />
                </Switch>

            </React.Fragment>
        );
    }
}
