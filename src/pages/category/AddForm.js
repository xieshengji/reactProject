import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cascader } from 'antd';
import {
    Form,
    Select,
    Input
} from 'antd'
const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {
    state={
        name:''
    }
    _change=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    getCategory = (props) => {
        this.categorys = props.categorys
        this.subCategorys = this.props.subCategorys
       return this.categorys.name
    }
    getNewName=()=>{
        this.newname= this.state.name
         return this.newname
      }
    sentmsg=(props)=>{
        props.getMsg2(this.newname)
    }
    formRef = React.createRef();
    componentWillMount() {
        this.getCategory(this.props)
    }
    render() {
        const categorys=this.categorys
        const name=this.getCategory(this.props)
        this.sentmsg(this.props)
        return (
            <Form
                ref={this.formRef}
            >
                <Item initialValue='0'>

                    <Select defaultValue='0'>
                        <Option value='0' >一级分类</Option>
                        {
                            categorys.map(c => <Option >{c.name}</Option>)
                        }
                    </Select>



                </Item>

                <Item>
                    <input placeholder={name} value={this.state.name} onChange={e=>this._change(e)}/>
                </Item>
            </Form>
        );
    }
}

export default AddForm;