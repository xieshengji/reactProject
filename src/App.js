// 应用根组件
import React, { Component } from 'react';
//注册路由
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
class App extends Component {

    render() {
        return (
            <Router>
                <Switch>{/* 只匹配其中一个 */}
                <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </Router>
        );
    }
}

export default App;