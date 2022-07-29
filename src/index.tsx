import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppStateProvider} from "./AppState"

//使用Context进行跨层传递数据 在此项目中，需要单独把全局变量放置在一起
// const defaultContextValue={
//   username:"胡佳豪"
// }
// export const appContext =React.createContext(defaultContextValue)

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
