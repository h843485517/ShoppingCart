import React from "react"
import { isPropertySignature } from "typescript";
import styles from './ShoppingCart.module.css'
import {FiShoppingCart} from "react-icons/fi"
import {appContext} from "../AppState"


//由于购物车是类组件，所以没有办法使用Hooks完成对Context的访问。
//所以用最原始的Consumer的方法进行访问

interface Props{

}

interface State{
  isOpen:boolean
}

// 使用类组件
class ShoppingChart extends React.Component<Props,State>{
  constructor(props:Props){
    super(props);
    this.state={
      isOpen:false
    }
  }
  handleBtnClick=(e:React.MouseEvent<HTMLButtonElement, MouseEvent> )=>{
    //e.target 描述的是事件发生的元素
    //e.currentTarget 描述的是事件处理绑定的元素
    // console.log(e.target)
    // console.log(e.currentTarget)
    this.setState((prev)=>({
      isOpen:!prev.isOpen
    }))
    //如果只想点击span时发生改变
    if((e.target as HTMLElement).nodeName==="SPAN"){
      console.log(this.state.isOpen)
    }
  }
  render(){
    return(
      <appContext.Consumer>{
        //箭头函数的参数是context中的取值
        (value)=>{
        return      (
        <div className={styles.cartContainer}>
            <button 
              className={styles.button} 
              onClick={this.handleBtnClick}
            >
              {/* 下载的图标 */}
              <FiShoppingCart/>
              <span>购物车{value.shoppingCart.items.length}（件）</span>
            </button>
            <div className={styles.cartDropDown} style={{display:this.state.isOpen ?"block":"none"}}>
              <ul>
                {value.shoppingCart.items.map((item,index)=>{
                  return(
                    <li key={index}>{item.name}</li>
                  )
                })}
              </ul>
            </div>
        </div>
        )}
      }
      </appContext.Consumer>
    )
  }
}
export default ShoppingChart