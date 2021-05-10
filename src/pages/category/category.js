import React, { Component } from 'react';
import { Card, Button, Table, message, Modal } from 'antd'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api/index'
import './category.less'
import AddForm from './AddForm'
import UpdateCategory from './UpdateCategory'
import LinkButton from '../../components/link-button/index'
// 商品分类
class Category extends Component {
    state = {
        //判断数据是否请求完
        loding: false,
        //一级分类列表
        categorys: [],
        subCategorys: [],//子分类列表
        parentId: '0',//父分类id
        parentName: '',//父分类名称
        showStatus: 0,//判断确认框是否显示
    }
    // 初始化Table的所有列的数组
    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',//显示数据对应的属性名
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (categorys) => (//返回需要指定的标签
                    <span>
                        <a href='javascripot:' onClick={() => {
                            this.showUpdate(categorys)
                        }}>修改分类</a>
                        {this.state.parentId = 0 ? <a href='javascripot:' onClick={() => this.showSubcategorys(categorys)}>查看子分类</a> : null}
                    </span>
                )
            }
        ]
    }
    getCategorys = async () => {
        //发请求前显示loding
        this.setState({
            loding: true
        })
        const { parentId } = this.state
        const result = await reqCategorys(parentId)
        //请求完后关闭loding
        this.setState({
            loding: false
        })
        if (result.status == 0) {
            if (parentId == '0') {
                //更新状态
                this.setState({
                    categorys: result.data
                })
            } else {
                this.setState({
                    subCategorys: result.data
                })
            }
        } else {
            message.error('请求失败')
        }
    }
    //显示二级分类列表
    showSubcategorys = (categorys) => {
        this.setState({
            parentId: categorys._id,
            parentName: categorys.name
        }, () => {//在状态更新后重新render后执行
            this.getCategorys()
        })
    }
    //显示修改框
    showUpdate = (categorys) => {
        //保存分类对象
        this.catelist = categorys
        this.name = categorys.name
        // console.log(categorys);
        // console.log(this.name);
        this.setState({
            showStatus: 2
        })
    }
    //显示确认框
    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }
    //更新分类
    updateCategory = async () => {
        //1.隐藏对话框
        this.setState({
            showStatus: 0
        })
        // 准备数据
        const categoryId = this.catelist._id
        const categoryName = this.msg
        // console.log(categoryId);
        // console.log(categoryName);
        // 2. 发请求更新分类
        const result = await reqUpdateCategory({ categoryId, categoryName })
        // console.log(result.status);
        if (result.status == 0) {
            // 3. 重新显示列表
            this.getCategorys()
        }

    }
    //关闭确认框
    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
    }
    //添加分类
    addCategory = () => {
        this.setState({
            showStatus: 0
        })
        // 隐藏确认框
     message.success('添加成功')
    }

//为第一次人的人做准备
componentWillMount() {
    this.initColumns()
}
//异步任务 发异步ajax请求
componentDidMount() {
    this.getCategorys()
}
render() {
    const name = this.name
    const parentId = this.state.parentId
    const parentNmae = this.state.parentName
    const subCategorys = this.state.subCategorys
    const showStatus = this.state.showStatus
    //读取loding
    const loding = this.state.loding
    //读取状态数据
    const categorys = this.state.categorys
    // debugger
    //card的左侧标题
    const title = parentId == 0 ? '一级分类列表' : <LinkButton onClick={() => {
        this.setState({
            //更新为显示一级列表状态
            parentNmae: '',
            parentId: '0',
            subCategorys: []
        })
    }}>一级分类列表 {parentNmae} 点击返回</LinkButton>
    //card的右侧
    const extra = (<Button type='primary' onClick={this.showAdd}>
        添加
    </Button>)
    return (
        <Card title={title} extra={extra} >
            <Table
                bordered
                loading={loding}
                dataSource={parentId == '0' ? categorys : subCategorys}
                columns={this.columns}
                pagination={{ defaultPageSize: 5, showQuickJumper: true }}
            />
            <Modal
                title="添加分类"
                visible={showStatus == 1}
                onOk={this.addCategory}
                onCancel={this.handleCancel}
            >
                <AddForm subCategorys={subCategorys} categorys={categorys} getMsg2={(msg) => {
                    this.msg2 = msg
                }}></AddForm>

            </Modal>

            <Modal
                title="更新分类"
                visible={showStatus == 2}
                onOk={this.updateCategory}
                onCancel={this.handleCancel}
            >
                <UpdateCategory categoryName={name} getMsg={(msg) => {
                    this.msg = msg
                }}></UpdateCategory>

            </Modal>
        </Card>

    );
}
}

export default Category;