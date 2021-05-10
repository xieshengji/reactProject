import React, { Component } from 'react';
import { Menu} from 'antd';
// import {
//     PieChartOutlined,
//     MailOutlined,
// } from '@ant-design/icons';
import logo from '../../assets/images/logo.png'
import './left-nav.less'
import { Link, withRouter } from 'react-router-dom'
/*
withRouter高阶组件:
包装非路由组件, 返回一个新的组件
新的组件向非路由组件传递3个属性: history/location/match
 */
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
class LeftNav extends Component {
    //根据menu的数据数组产生对应标签
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
           console.log(item);
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}
                    >
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={item.title}
                    >
                        {this.getMenuNodes_map(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname
        return menuList.reduce((pre, item) => {
            if (!item.children) {
                //pre初值为[],意思是上一次统计的结果
                //向pre中添加MenuItem
                pre.push(
                    (
                        <Menu.Item key={item.key}
                        >
                            <Link to={item.key}>
                                {item.title}
                            </Link>
                        </Menu.Item>
                    )
                )
            }
            else {
                // 查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                // 如果存在, 说明当前item的子列表需要打开
                if (cItem) {
                    this.openKey = item.key
                }

                //向pre中添加SubMenu    
                pre.push(
                    (
                        <SubMenu
                            key={item.key}
                            title={item.title}
                        >
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    )
                )
            }
            return pre
        }, [])
    }
    componentWillMount () {
        this.menuNodes = this.getMenuNodes(menuList)
      }
    render() {
        //得到当前请求的路由路径

        let path = this.props.location.pathname
        if (path.indexOf('/product') === 0) { // 当前请求的是商品或其子路由界面
            path = '/product'
        }
        //得到需要打开菜单项的key
        const openKey = this.openKey
        return (
            <div className='left-nav'>
                {/* 头部 */}
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo" />
                    <h1>谢圣吉后台</h1>
                </Link>
                {/* 导航栏菜单 */}
                <Menu
                    selectedKeys={[path]}
                    defaultSelectedKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menuNodes}
                </Menu>
            </div>
        );
    }
}
/*
withRouter高阶组件:
包装非路由组件, 返回一个新的组件
新的组件向非路由组件传递3个属性: history/location/match
 */
export default withRouter(LeftNav);