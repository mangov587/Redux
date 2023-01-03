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
    dispatch:(action)=>{
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
 //同步dispatch 
const {dispatch:syncDispatch}=store;
//异步函数-dispatch 
let dispatchFn=(action)=>{
    if(action instanceof Function){
        action(dispatchFn)
    }else{
        syncDispatch(action)
    }
}
//Promise-dispatch 
const dispatch=(action)=>{
    
    if(action.payload instanceof Promise){ 
        action.payload.then(data=> {
            dispatch({...action, payload: data})
          })
    }else{
        dispatchFn(action)
    }
}
const connect =(mapStateToProps,mapDispatchToProps)=>(Component) => {
 
    return (props)=>{
      const {subscribe} = store
      const [,forceUpdate]=useReducer((x)=>x+1,0)//更新
      const data=mapStateToProps?mapStateToProps(state):{state};
      mapStateToProps&&console.log(mapStateToProps(state))

     const newDispatch=mapDispatchToProps?mapDispatchToProps(dispatch):{dispatch}
      //TO 需要增加更新条件-前后两次data不同
      useEffect(()=>{
        subscribe(forceUpdate)
      },[])
      return <Component {...props} {...newDispatch} {...data}/>
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