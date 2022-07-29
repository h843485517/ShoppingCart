import React,{useContext} from 'react'
import styles from './Robot.module.css'
import {appContext,appSetStateContext} from "../AppState"
import {useAddToCart} from './AddToCart'



interface RootPops{
  id:number,
  name:string,
  email:string
}



//使用函数组件
const RobotDisCount:React.FC<RootPops>=({id,name,email})=>{

  //hooks+context 可以代替redux

  const value=useContext(appContext) //直接使用Hooks中useContext来拿传过来的属性value 更简单
  const addToCart=useAddToCart();

  //在Context Consumer中应该使用箭头函数
  return (

    // <appContext.Consumer>
      // {
      //   (value)=>{
      //     return(
        (
          <div className={styles.cardContainer}>
            <img alt="robot" src={`https://robohash.org/${id}`}></img>
            <h2>打折商品</h2>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>作者名称:{value.username}</p>
            {/* <button onClick={addToCart}>加入购物车</button> */}
            <button onClick={()=>addToCart(id,name)}>加入购物车</button> 
          </div>  
          )     
      //   } 
      // }
    // </appContext.Consumer>
    );
}

export default RobotDisCount