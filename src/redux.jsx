import React, {useState, useContext} from 'react'
const appContext = React.createContext(null)
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
  
  const connect = (Component) => {
    return (props)=>{
      const {appState, setAppState} = useContext(appContext)
      const dispacth=(action)=>{
        setAppState(reducer(appState,action))
      }
      return <Component {...props} dispacth={dispacth} appState={appState}/>
    }
  }
  export {
    appContext,
    connect
  }