import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Select,
    Input,
} from 'antd'

const Item = Form.Item

/*
添加分类的form组件
 */
class AddForm extends Component {
     formRef=React.createRef()
    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    }
    //向父组件传值
    postMsg=()=>{
    this.props.setForm(this.formRef.current)
}
    comp1onentDidMount() {
        this.props.setForm(this.formRef.current)
    }
    render() {
    // 指定Item布局的配置对象
    this.props.setForm(this.formRef.current)
    const formItemLayout = {
        labelCol: { span: 4 },  // 左侧label的宽度
        wrapperCol: { span: 15 }, // 右侧包裹的宽度
      }
        return (
            <Form 
            ref={this.formRef}>
                <Item  {...formItemLayout} label='角色名称' name='roleName' initialValue='' rules={[{ required: true, message: '必须输入角色名称' }]}>
                    <Input value='22' placeholder='请输入角色名称' onChange={this.postMsg}/>
                </Item>
            </Form>
        )
    }
}

export default AddForm