import React,{useContext} from 'react'
import styles from './Robot.module.css'
import {appContext,appSetStateContext} from "../AppState"
import {withAddToCart} from "./AddToCart"

// 如果要使用高阶组件，应该把函数组件的定义，传递给高阶组件去
export interface RobotProps{
  id:number,
  name:string,
  email:string,
  addToCart:(id,name)=>void
}

//使用函数组件
const Robot:React.FC<RobotProps>=({id,name,email,addToCart})=>{

  //【注意：此处的id，name，email是从父组件传递过来的】

  //hooks+context 可以代替redux

  const value=useContext(appContext) //直接使用Hooks中useContext来拿传过来的属性value 更简单
  return (
          (
          <div className={styles.cardContainer}>
            <img alt="robot" src={`https://robohash.org/${id}`}></img>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>作者名称:{value.username}</p>
            {/* <button onClick={addToCart}>加入购物车</button> */}
            <button onClick={()=>addToCart(id,name)}>加入购物车</button>
          </div>  
          )     

    );
}
export default withAddToCart(Robot)



  // //此处为添加购物车业务代码逻辑，可以将其放入高阶组件去，避免代码冗余
  // const setState=useContext(appSetStateContext) //使用Hooks中useContext来获取穿过来的setState方法
  // const addToCart =()=>{
  //   // 因为在做初始化的时候setState是一个undefined，所以需要判断
  //   if(setState){
  //     //将state展开,避免数据丢失,然后在这个组件修改全局变量shoppingCart对象
  //     setState(state=>{
  //       return {
  //         ...state,
  //         shoppingCart:{
  //           items:[...state.shoppingCart.items,{id,name}]
  //         }
  //       }
  //     })
  //   }
  // }
    