import React, { Component } from 'react'
import axios from "axios"

export default class CreateUser extends Component {

    /*Vamos a guardar la info q me viene del backend, (gracias al pedido axios al puerto 4000), la res.data, la que consologuee como "res", en el state, en el array users.
    Ahora quiero que ademas de recibirlos me los muestre por pantalla, para eso voy a hacer una ul en nuestro metodo render*/

    state = {
        users:[],
        username:""
    }

    /*componentDidMount: es un metodo del componente q te ayuda a ejecutar funciones/codigo una vez el componente ha sido montado. Vamos a utilizar este metodo para, una vez montado el componente, poder pedir los datos al servidor para mostrarlos en pantalla.
    Para hacer peticiones en el navegador existe una API o un codigo llamado fetch(), nos permite hacer peticiones HTTP: PUT, GET, DELETE, POST, etc.
    Pero una aplicacion real conviene mas usar una biblioteca HTTP, xq no solo haces peticiones HTTP, si no muchas cosas mas tmb, como hacer loaders, poder tener un manejo de errores, etc.
    Por eso es bastante comun usar bibliotecas como AXIOS.
    Como el pedido es asincrono vamos a manejar esa asincronicidad usando async await
    */

    /*Le aviso a component did mount q va a utilizar el metodo get users */
    async componentDidMount() {
        this.getUsers()
    } 
    
    getUsers = async () => {
        const res = await axios.get("http://localhost:4000/api/users");
        this.setState({users:res.data})
    }
    
/*Si el metodo para el onChange lo escribimos como una arrow function no necesitamos bindearlo*/
onChangeUsername = (e)=> {
    this.setState({username: e.target.value})
}

/*vamos a usar el preventDefault para evitar que la pagina se refresque al submitear y un pedido POST a axios con lo que tenemos en el state, le ponemos la ruta de nuestro backend y lo concatenamos con el username que es lo que tenemos en el estado como username*/

onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/users", {username: this.state.username});
    this.setState({username:''});
    this.getUsers();
}

/*Creamos el metodo delete user q lo vamos a pasar como una funcion q se ejecuta cuando haces dobleclick en un username y toma el user._id de ese usuario como parametro y con eso hacemos un pedido DELETE a axios a nuestra api en el puerto: 
4000/api/users + el id q tomamos por parametro. Despues de borrar ese usuario queremos volver a ejecutar ell metodo getUsers para ver la lista actualizada de los usuarios q estan en la base de datos (todos menos el q eliminamos) */ 

deleteUser = async (id) => {
    console.log(id)
   await axios.delete('http://localhost:4000/api/users/'+ id )
   this.getUsers();
}

    render() {
        return (
            <div className="row">
                    <div className="col-md-4">
                        <div className="card card-body">
                            <h3>Create New User</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control" value={this.state.username}
                                    onChange={this.onChangeUsername}/>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md8">
                        <ul className="list-group">
                            {
                                this.state.users.map(user => (
                                <li 
                                className="list-group-item list-group-item-action" 
                                key={user._id}
                                onDoubleClick={()=> this.deleteUser(user._id)}
                                >
                                    {user.username}
                                </li>))
                            }
                        </ul>
                    </div>
                </div>
        )
    }
}
