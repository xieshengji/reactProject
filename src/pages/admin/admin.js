import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
// 后台管理的路由组件
import memoryUtils from '../../utils/memoryUtils'
//导入antd布局组件
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Order from '../order/order'
const { Footer, Sider, Content } = Layout;
class Admin extends Component {
    render() {
        const user = memoryUtils.user
        // 如果内存没有存储user ==> 当前没有登陆
        if (!user || !user._id) {
            // 自动跳转到登陆(在render()中)
            return <Redirect to='/login' />
        }
        //如果没有登录
        if (!user) {
            //自动跳转到登录 (路由重定向)
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{
                height: '100%'
            }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header >
                        <Header />
                    </Header>
                    <Content style={{margin:20,backgroundColor: '#fff' }}>
                        <Switch>
                            <Redirect from='/' exact to='/home' />
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/user' component={User} />
                            <Route path='/role' component={Role} />
                            <Route path="/charts/bar" component={Bar} />
                            <Route path="/charts/pie" component={Pie} />
                            <Route path="/charts/line" component={Line} />
                            <Route path="/order" component={Order} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器,效果更好哟</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;