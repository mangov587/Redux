
import React, {useState, useContext} from 'react'
import {
  createStore,
  connect,
  Provider,
} from './redux'

const reducer=(state,{type,payload})=>{
  switch (type){
    case 'updateUser':
      return {
        ...state,
        user: {
          ...state.user,
          ...payload
        }
      }
      default:
        return state
  }
}
const initState = {
  user: {name: 'frank', age: 18},
}
const store=createStore(reducer, initState)
const mapUserStateToProps=state => {
  return {user: state.user}
}

const mapUserDispatchToProps=(dispatch)=>{
  return {
    updateUser: (attrs)=> dispatch({type: 'updateUser', payload: attrs})
  }
}
export const App = () => {
  //放在这里一旦setAppState，所有子组件重新渲染
  // const [appState, setAppState] = useState({
  //   user: {name: 'frank', age: 18}
  // })
  // const contextValue = {appState, setAppState}
  return (
    <Provider store={store}>
      <List1/>
      <List2/>
      <List3/>
    </Provider>
  )
}
const List1 = () => <section>列表1<User/></section>
const List2 = () => <section>列表2<UserModifier/></section>

const List3 = () => {
  console.log('列表三渲染了')
  return (<section>列表3</section>)
}



const User =connect()(({state}) => {
  return <div>User:{state.user.name}</div>

})
const ajax = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({data: {name: '3秒后的frank'}})
    }, 3000)
  })
}

const fetchUserPromise = () => {
  return ajax().then(response => response.data)
}
const fetchUser = (dispatch) => {
  return ajax().then(response => dispatch({type: 'updateUser', payload: response.data}))
}
//const _UserModifier = ({dispacth,state}) => {
const _UserModifier = ({user,dispatch}) => {

  //const {appState, setAppState} = useContext(appContext)
  const onChange = (e) => {
   
    // 1、初始
    //setAppState({...appState})
    // 2、reducer优化
    // setAppState(reducer(appState,{
    //   type:'updateUser',
    //   payload:{
    //     name:e.target.value
    //   }
    // }))

    /**
     * 3、dispacth优化
     * 修改是state时只需要修改action，setAppState方法不变
     */
    // dispacth({
    //   type:'updateUser',
    //   payload:{
    //     name:e.target.value
    //   }
    // })
    // dispatch一个请求接口的异步函数
    dispatch(fetchUser)
     // payload 是一个Promise
    //dispatch({type: 'updateUser', payload: fetchUserPromise()})
  }
  return <div>
    <input value={user.name}
      onChange={onChange}/>
  </div>
}
const UserModifier=connect(mapUserStateToProps)(_UserModifier)