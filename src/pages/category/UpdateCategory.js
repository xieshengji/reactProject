import React, { Component } from 'react'
import {
    Form
} from 'antd'

class UpdateCategory extends Component {
    state={
        name:''
    }
    _change=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    getNewName=()=>{
      this.newname= this.state.name
       return this.newname
    }
    getName=(props)=>{
        this.name=props.categoryName
        return this.name
    }
    sentmsg=(props)=>{
        props.getMsg(this.newname)
    }
    render() {
        const newname=this.getNewName()
        const name=this.getName(this.props)
        this.sentmsg(this.props)
        return (
            <Form
                ref={this.formRef}
            >
                <input 
                    placeholder={name} value={this.state.name} onChange={e=>this._change(e)}
                >
           
                </input>
            </Form>
        );
    }
}

export default UpdateCategory;