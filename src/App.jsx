
import React, {useState, useContext} from 'react'
import {
  appContext,
  connect,
  Provider,
  store
} from './redux'


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
const User =connect(({state}) => {
  return <div>User:{state.user.name}</div>

})


const _UserModifier = ({dispacth,state}) => {
  //const {appState, setAppState} = useContext(appContext)
  const onChange = (e) => {
    state.user.name = e.target.value
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
    console.log('e.target.value>>>>',e.target.value)
    dispacth({
      type:'updateUser',
      payload:{
        name:e.target.value
      }
    })
  }
  return <div>
    <input value={state.user.name}
      onChange={onChange}/>
  </div>
}
const UserModifier=connect(_UserModifier)