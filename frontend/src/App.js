import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import CreateNote from "./components/CreateNote"
import CreateUser from "./components/CreateUser"
import NotesList from "./components/NotesList"

//El form del componente CreateNote lo vamos a usar tanto para crear como para editar notas

function App() {
  return (
<Router>
  <Navigation/>
 <div className="container p-4">
 <Route path="/" exact component={NotesList} />
  <Route path="/edit/:id"component={CreateNote} /> 
  <Route path="/create"component={CreateNote} />
  <Route path="/user"component={CreateUser} />
 </div>
</Router>
  );
}

export default App;
