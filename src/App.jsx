
import React, {useState, useContext} from 'react'
import {
  appContext,
  connect
} from './redux'
export const App = () => {
  const [appState, setAppState] = useState({
    user: {name: 'frank', age: 18}
  })
  const contextValue = {appState, setAppState}
  return (
    <appContext.Provider value={contextValue}>
      <List1/>
      <List2/>
      <List3/>
    </appContext.Provider>
  )
}
const List1 = () => <section>列表1<User/></section>
const List2 = () => <section>列表2<UserModifier/></section>
const List3 = () => <section>列表3</section>
const User = () => {
  const contextValue = useContext(appContext)
  return <div>User:{contextValue.appState.user.name}</div>

}


const _UserModifier = ({dispacth,appState}) => {
  //const {appState, setAppState} = useContext(appContext)
  const onChange = (e) => {
    appState.user.name = e.target.value
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
    dispacth({
      type:'updateUser',
      payload:{
        name:e.target.value
      }
    })
  }
  return <div>
    <input value={appState.user.name}
      onChange={onChange}/>
  </div>
}
const UserModifier=connect(_UserModifier)