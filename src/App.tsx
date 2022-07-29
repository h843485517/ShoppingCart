import React,{useState, useEffect} from 'react';
import logo from './assets/images/logo.svg';
// import './App.css'; 可以全局导入，但是会引起渲染污染
import robots from './mockdata/robots.json' //自己本地的数据
import Robot from './components/Robot';
import RobotDisCount from './components/RobotDiscount';
import styles from "./App.module.css"
import ShoppingChart from './components/ShoppingChart'





//custom.d.ts中导出的class是通过import模块 生成了JS对象，会由JS对象动态注入到css样式中
//这种css注入的方式即jss

interface State{
  robotGallery:any,
  count:number
}

//为什么这个地方要用any，而不用TS的定义
//资源来源于网络请求，返回的数据不受控制；如果前端强行定义API数据类型，则违反前后端分离的原则；
// 不能为了使用Type而放弃JS的灵活性
interface Props{
}

//---------------------------------------class组件--------------------------------------
// class App  extends React.Component<Props,State>{
//   constructor(props:Props){
//     super(props)
//     this.state={
//       robotGallery:[],
//       count:0
//     }
    
//   }
//   componentDidMount(){
//     fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response)=>response.json())
//     .then((data)=>this.setState({robotGallery:data}))
//   }
//   render(){
//     return (
//       <div className={styles.app}>
//         <div className={styles.appHeader}>
//           <img src={logo} className={styles.appLogo} alt="logo"/>
//           <h1>罗伯特机器人炫酷吊炸天online购物平台</h1>
//         </div>
        
//         <button
//           onClick={()=>{
//             // 注意：setState是异步更新，同步执行
//             this.setState((prev,_)=>(
//               {count:prev.count+1}
//             ),()=>{
//               console.log("count",this.state.count)
//             });
//             this.setState((prev,_)=>(
//               {count:prev.count+1}
//             ),()=>{
//               console.log("count",this.state.count)
//             });
//           }}>
//         Click
//       </button>
//       <span>Count:{this.state.count}</span>
//         <ShoppingChart/>
//         <div className={styles.robotList}>
//           {/* 加载本地数据 */}
//           {/* {robots.map((r) =>(
//           <Robot id={r.id} email={r.email} name={r.name}/>
//           ))} */}

//           {/* 加载异步请求回来的数据 */}
//           {this.state.robotGallery.map((r) =>(
//           <Robot id={r.id} email={r.email} name={r.name}/>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// ---------------------------------------Hook--------------------------------------
const  App :React.FC=(props)=> {
  //第一个参数是state中的变量，第二个是一个函数。
  //阅读useState源码得知，返回的是一个    useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
  const [count,setCount]=useState<number>(0)
  const [robotGallery,setRobotGallery]=useState<any>([])
  const [loading,setLoading]=useState<boolean>(false)
  const [error,setError] =useState<string>()

  //第二个参数是数组，数组里面是状态列表，当发生状态就触发useEffect中的逻辑。
  //如果第二个参数为空数组，就类似类组件的ComponentDidMount。有且仅有数据被第一次挂载的时候调用
  useEffect(()=>{
    document.title=`点击${count}次`
  },[count])

  //适合一开始访问数据初始化state。第二个参数必须要有。
  // useEffect(()=>{
  //   const response= fetch("https://jsonplaceholder.typicode.com/users")
  //   .then((response)=>response.json())
  //   .then((data)=>setRobotGallery(data))
  // },[])

  //useEffect和async await结合
  useEffect(() => {
    //将async所有函数提取出来
    const fetchData = async () => {
      setLoading(true);
      try {
        const responses = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        // .then(response => response.json())
        // .then(data => setRobotGallery(data))
        const data = await responses.json();
        //获取数据方法
        setRobotGallery(data);
      } catch (e:any) {
        setError(e.message);
      }
      //
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo"/>
        <h1>罗伯特机器人炫酷吊炸天online购物平台</h1>
      </div>
      <button
        onClick={()=>{
          setCount(count+1)
        }}>
        Click
      </button>
      <span>Count:{count}</span>
      {(!error || error !== "") && <div>网站出错：{error}</div>}
      <ShoppingChart/>
      {
         !loading ?(
          <div className={styles.robotList}>
            {/* 加载异步请求回来的数据 
                高阶组件的应用
            */}
            {robotGallery.map((r,index) =>
              index%2==0?(
                <Robot id={r.id} email={r.email} name={r.name}/>
              ):(
                <RobotDisCount id={r.id} email={r.email} name={r.name}/>
              )
     
            )}
          </div>
        ):(
          <h2>loading 加载中</h2>
        )
      }
  
    </div>
  );
  
}


export default App;
