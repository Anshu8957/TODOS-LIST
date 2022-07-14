import {
  BrowserRouter as Router,Route,Routes,Switch
  
  
  } from "react-router-dom";
import React, { useEffect , useState } from 'react';
import './App.css';
import Header from './components/Header';
import {Footer} from './components/Footer';
import {Todos} from './components/Todos';
import {AddTodo} from './components/AddTodo';
import {About} from './components/About';




function App() {
  
  let initTodo ;
  

  
  if(localStorage.getItem("todos")===null){
    initTodo = [];
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
const onDelete = (todo)=>{
  console.log("I am ondelete of todo", todo);
  //detelting this way in react does not work
  //let index = todos.indexOf(todo);
  //todos.splice(index, 1);

  setTodos(todos.filter((e)=>{
    return e!==todo;
  }));
  localStorage.getItem("todos", JSON.stringify(todos));
}

const addTodo =  (title, desc)=>{
  console.log("I am adding this Todo", title, desc)
  let sno;
  if(todos.length===0){
    sno=0;
  }
  else{
    sno = todos[todos.length-1].sno + 1;
  }
  
  
  const myTodo = {
    sno: sno,
    title: title,
    desc: desc,
  }
  setTodos([...todos, myTodo]);
  console.log(myTodo);
}

const [todos, setTodos] = useState(initTodo);
useEffect(()=> {
  localStorage.setItem("todos", JSON.stringify(todos));
  
},[todos])
return (
  <>
   <Router>
    
   <Header title="My Todos List" searchBar={false}/>
   <Switch>
   
   
   
     <Route exact path="/" render={()=>{
       return(
         <>
         <AddTodo addTodo={addTodo}/>
   <Todos todos ={todos} onDelete={onDelete}/>
         </>
       )
      }}>
       
     </Route>
   
   <Route exact path="/about" component={About}>
     
   </Route>
   

   
  
   </Switch>
   </Router>
   <Footer/>
   </>
   
  );
}

export default App;