import React,{useState} from 'react'

//通过interface来定义上下文的类型。存放全局变量
interface AppStateValue{
  username:string;
  //购物车的数据
  shoppingCart:{items:{id:number,name:string}[]} 
}

//赋初始值
const defaultContextValue:AppStateValue={
  username:"胡佳豪",
  shoppingCart:{items:[]}

}

//创建默认的Context
export const appContext =React.createContext(defaultContextValue)
//添加购物车的操作设计到全局状态state的更新,为了能共享setState钩子，需要创造一个Context来连接setState这个函数
export const appSetStateContext =React.createContext<React.Dispatch<React.SetStateAction<AppStateValue>>|undefined>(undefined)

//将全局变量通过Context传递出去。此相当于一个高阶函数HOC,作用是将所有的子组件包裹起来
//并且从全局的角度来提供数据支持
export const AppStateProvider:React.FC=(props)=>{
  const [state,setState]=useState(defaultContextValue)
  return  (
  <appContext.Provider value={state}>
     <appSetStateContext.Provider value={setState}>
      { props.children}
    </appSetStateContext.Provider>
  </appContext.Provider>
  )
}
