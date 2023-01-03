
import React, {useState, useContext} from 'react'

const appContext = React.createContext(null)
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
const UserModifier = () => {
  const {appState, setAppState} = useContext(appContext)
  const onChange = (e) => {
    appState.user.name = e.target.value
    setAppState({...appState})
  }
  return <div>
    <input value={appState.user.name}
      onChange={onChange}/>
  </div>
}