import React, { Component } from 'react';
import './header.less'
import { withRouter } from 'react-router-dom'
import { formateDate } from '../../utils/data'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd'
import memory from '../../utils/memoryUtils'
import store from '../../utils/storageUtils'
import { ExclamationCircleOutlined } from '@ant-design/icons';

class Header extends Component {

    state = {
        now: formateDate(Date.now())
    }
    //退出登录
    logOut = () => {
        const { confirm } = Modal;
        confirm({
            title: '你确定你要退出?',
            icon: <ExclamationCircleOutlined />,
            content: '嗯?',
            onOk:()=> {
                memory.user = {}
                store.removeUser()
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('取消');
            },
        });
    }
    //动态获取时间
    getTime = () => {
        // 每隔1s获取当前时间, 并更新状态数据currentTime
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({
                now: currentTime
            })
        }, 1000)
    }
    //动态获取标题
    getTitle = () => {
        //得到当前请求路径
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key == path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key == path)
                if (cItem) {
                    title = cItem.title
                }
            }

        })
        return title
    }
    componentDidMount() {
        //不断更新时间
        this.getTime()
    }
    //当前组件卸载时调用
    componentWillUnmount(){
     //清除定时器
     clearInterval(this.intervalId)
    }
    render() {
        const t = this.getTitle()
        const { now } = this.state
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎,admin</span>
                    <a href='javaScriopt:' onClick={this.logOut}>退出</a>
                </div>
                <div className='header-bottom'>
                    <div className="header-bottom-left">{t}</div>
                    <div className="header-bottom-right">
                        <span>
                            {now}                   </span>
                        <img src={logo} alt="/sun" />
                        <span>
                            晴
                    </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);