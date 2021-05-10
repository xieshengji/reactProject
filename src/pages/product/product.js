import React, { Component } from 'react';
import {Switch,Route,Redirect } from 'react-router-dom'
import ProductHome from './home'
import AddProduct from './add-update'
import Detail from './detail'
import './product.less'
// 商品路由
class Product extends Component {
    render() {
        return (
           <Switch>
               <Route exact path='/product' component={ProductHome}></Route>
               <Route exact path='/product/addupdate' component={AddProduct}></Route>
               <Route exact path='/product/detail' component={Detail}></Route>
               <Redirect to='/product'></Redirect>
           </Switch>
        );
    }
}

export default Product;