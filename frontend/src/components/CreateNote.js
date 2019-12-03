import React, { Component } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"

export default class CreateNote extends Component {

    state={
        users: [],
        userSelected:'',
        date: new Date(),
        title:'',
        content:'',
        editing: false,
        _id:''
    }

    async componentDidMount() {

        /* console.log(this.props.match.params.id) : Es el id q aparece como parametro en la ruta, basado en la existencia o la no existencia de este id vamos a decidir si la persona que entra a esta ruta, a este formulario viene a CREAR una nota o a MODIFICARLA, si el id existe, viene a modificar nota, si el id NO existe viene a crearla*/

        const res =await axios.get('http://localhost:4000/api/users')
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username
    })
    if (this.props.match.params.id) {
       const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id)
       console.log(res.data)
        this.setState({
            userSelected: res.data.author,
            title: res.data.title,
            content: res.data.content,
            date: new Date(res.data.date),
            editing: true,
            _id: this.props.match.params.id
        })
    }

}
/* Queremos que el componente Create Note nos lleve al Notes List y podemos hacerlo simplemente utilizando: desde el objeto window su location .href, es decir, que me coloque en una nueva direccion, en este caso, la direccion inicial:
window.location.href="/"; */
 

    onSubmit = async (e) => {
        e.preventDefault()
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        };
        if(this.state.editing) {
            await axios.put("http://localhost:4000/api/notes/"+this.state._id , newNote)
        }else {
            await axios.post("http://localhost:4000/api/notes", newNote);
        }
       window.location.href="/";

    }


/* Para no escribir 50 metodos que son iguales salvo sus nombres y todos toman el e.target.value, puedo hacer un solo input change y decirle que setee en el state un objeto con una propiedad/un name y un valor/un value !! dependiendo del name q me de voy a actualizar un dato u otro, depende del input que estoy escribiendo.
o sea, por ejemplo, en el input para el username pasaria esto:
setState({[e.target.name]: e.target.value}) = {username : Mumilu}
y en un input para una descripcion esto: {description : mi gordito loco prr prr}*/   

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({date})
    }

    render() {

        /*Para que cuando queres editar una nota y queres que el formulario te aparesca ya relleno con la info que tenes y asi solo actualizar algun dato en especifico sin tener que completar todo el formulario: 
        Simplemente hay que ponerle a cada input un:
         value={this.state.elnamedeseinput} */

        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a Note</h4>
                    
                    {/*Select USER */}
                    <div className="form-group">
                        <select
                        className="form-control"
                        name="userSelected"
                        onChange={this.onInputChange}
                        value={this.state.userSelected}
                        >
                            {
                            this.state.users.map(user => 
                            <option key={user} value={user}>
                                {user}
                            </option>)
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="text" 
                        onChange={this.onInputChange}
                        className="form-control" 
                        placeholder="Title" 
                        name="title"
                        value={this.state.title}
                        required
                        />
                    </div>

                    <div className="form-group">
                        <textarea name="content"
                        onChange={this.onInputChange}
                        className="form-control"
                        placeholder="Content"
                        value={this.state.content}
                        >

                        </textarea>
                    </div>

                    <div className="form-group">
                        <DatePicker className="form-control"
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>

                    <form onSubmit={this.onSubmit}>

                        <button type="submit" className="btn btn-primary">
                            Save <i className="material-icons">
                                assignment</i>
                        </button>
                    </form>
                </div>
            </div>    
          
                )
    }
}
