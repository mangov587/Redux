import React, {useState, useContext, useReducer, useEffect} from 'react'
const appContext = React.createContext(null)
const store={
    state:{
      user: {name: 'frank', age: 18}
    },
    setState(val){
     // console.log('store.state>>>',store.state)
      //state变了，但是页面未更新
      store.state=val
      store.listeners.forEach(fn=>fn())
    },
    listeners:[],
    subscribe(fn){
       store.listeners.push(fn)
       return (fn)=>{
        store.listeners.filter(item=>item!=fn)
       }
    },
  }
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
      const {state, setState,subscribe} = useContext(appContext)
      const [,forceUpdate]=useReducer((x)=>x+1,0)//更新
      const dispacth=(action)=>{
        setState(reducer(state,action))   
      }
      //更新
      useEffect(()=>{
        subscribe(forceUpdate)
      },[])
      return <Component {...props} dispacth={dispacth} state={state}/>
    }
}
//优化appContext.Provider
const Provider=({store,children})=>{
    return (
    <appContext.Provider value={store}>
      {children}
      </appContext.Provider>
    )
}
export {
    appContext,
    connect,
    Provider,
    store
}