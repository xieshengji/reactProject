import React, { Component } from 'react';
import './login.less'
import logo from './images/logo.png'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';
// 登录的路由组件

class Login extends Component {

    formRef = React.createRef();
    handleSubmit = (event) => {
        this.formRef.current.validateFields().then(values => {
            //请求登录
            const { username, password } = values
            reqLogin(username, password).then(response => {
                if (response.status == 0) {
                    message.success('登录成功')
                    //保存user
                    const user=response.data
                    memoryUtils.user=user
                    storageUtils.saveUser(user)//保存到local中
                    //页面跳转
                    this.props.history.replace('/')
                }
                else
                    message.error('登陆失败')
            }).catch(error => {
                console.log('faild', error);
            })
        })

    }
    render() {
        //如果用户已经登录 自动跳转到管理界面
        // const user=memoryUtils.user
        // if(user && user.id)
        // {
        //     return <Redirect to='/'/>
        // }
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>谢圣吉的后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>

                    <Form
                        ref={this.formRef}
                        name="normal_login"
                        className="login-form"
                        onFinish={this.handleSubmit}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, whitespace: true, message: '用户名必须输入' },
                            { min: 4, message: '用户名至少4位' },
                            { max: 12, message: '用户名最多12位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, whitespace: true, message: '用户名必须输入' },
                            { min: 4, message: '用户名至少4位' },
                            { max: 12, message: '用户名最多12位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="用户密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" >
                                登录
                     </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}

export default Login;
//  1.前台表单验证
// 用户名 / 密码的合法性要求: /*用户名/密码的的合法性要求 1). 必须输入 2). 必须大于等于 4 位 3). 必须小于等于 12 位 4). 必须是英文、数字或下划线组成 */
//  2.收集表单输入数据