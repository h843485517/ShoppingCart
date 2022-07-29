
import React,{useContext}from 'react'
import { appSetStateContext } from '../AppState';
import { RobotProps } from './Robot';



export const withAddToCart =(ChildComponent:React.ComponentType<RobotProps>)=>{
  // return class extends React.Component{} 高阶组件中可以返回匿名的类组件
  return (props)=>{
    const setState=useContext(appSetStateContext) //使用Hooks中useContext来获取穿过来的setState方法
    const addToCart =(id,name)=>{
      // 因为在做初始化的时候setState是一个undefined，所以需要判断
      if(setState){
        //将state展开,避免数据丢失,然后在这个组件修改全局变量shoppingCart对象
        setState(state=>{
          return {
            ...state,
            shoppingCart:{
              items:[...state.shoppingCart.items,{id,name}]
            }
          }
        })
      }
    }
    return <ChildComponent {...props} addToCart={addToCart}/>
  };
}

//自定义Hook 建议使用自定义Hook来代替高阶组件，代码更加清晰，是一个纯函数，没有复杂的生命周期，方便维护
export const useAddToCart =()=>{
  const setState=useContext(appSetStateContext) //使用Hooks中useContext来获取穿过来的setState方法
  const addToCart =(id,name)=>{
    // 因为在做初始化的时候setState是一个undefined，所以需要判断
    if(setState){
      //将state展开,避免数据丢失,然后在这个组件修改全局变量shoppingCart对象
      setState(state=>{
        return {
          ...state,
          shoppingCart:{
            items:[...state.shoppingCart.items,{id,name}]
          }
        }
      })
    }
  }
  // 返回值不再是组件,而是业务逻辑本身
  return addToCart;
}