import React, { Component } from 'react';
import { Menu } from './components/Menu';
import { Route, Switch } from "react-router-dom";
import { Dashboard } from './components/Dashboard';
import { FetchData } from './components/FetchData';
import { Driver } from './components/Driver';
import 'react-notifications/lib/notifications.css';
import { Vehicle } from './components/Vehicle';
import { Party } from './components/Party';
import { Daily } from './components/Daily';


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
                    <Route path='/vehicle' component={Vehicle} />
                    <Route path='/party' component={Party} />
                    <Route path='/daily' component={Daily} />
                </Switch>

            </React.Fragment>
        );
    }
}
