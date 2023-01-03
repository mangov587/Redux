import React, {useState, useContext, useReducer, useEffect} from 'react'
const appContext = React.createContext(null)
const listeners=[];
let state=undefined;
let reducer=undefined;
const  setState=(val)=>{
    // console.log('store.state>>>',store.state)
     //state变了，但是页面未更新
     state=val
     listeners.forEach(fn=>fn())
}
const store={
    getState(){
        return state
    },
    dispacth:(action)=>{
        setState(reducer(state,action))   
    },
    subscribe(fn){
       listeners.push(fn)
       return (fn)=>{
        listeners.filter(item=>item!=fn)
       }
    },
  }
const createStore = (_reducer, initState) => {
    console.log('createStore')
    state = initState
    reducer = _reducer
    return store
  }
  
const {dispacth}=store
const connect = (Component) => {
 
    return (props)=>{
      //const {state,subscribe} = useContext(appContext)
      const {getState,subscribe} = store
      const [,forceUpdate]=useReducer((x)=>x+1,0)//更新
     const state=getState()
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
    connect,
    Provider,
    createStore
}