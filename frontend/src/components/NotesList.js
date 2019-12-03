import React, { Component } from 'react'
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"

export default class NotesList extends Component {

     /*Lo primero que voy a necesitar son los datos, asi que voy a almacenar en el state del componte una lista de usuarios que voy a traer desde el backend, cosa que voy a hacer proximamente desde el componentDidMount*/

    state= {
        notes:[]
    }

    async componentDidMount() {
    this.getNotes()
    }

    async getNotes() {
        const res = await axios.get('http://localhost:4000/api/notes')
        this.setState({notes: res.data})
    }

    deleteNote = async (id) => {
       await axios.delete('http://localhost:4000/api/notes/'+id);
       this.getNotes();
    }

    render() {
        return (
            /*Voy a hacer un renderizado de todas las notas que tengo almacenadas en mi base de datos, creando un div class row, en este caso divido en 3 partes, multiples columnas de 4, las cards van a tener title, content, author, descripcion, y...

            -Que hacemos con los timestamp?-! ...  convertimos su formato feo a formato entendible y agradable.
            esto se puede lograr con: TIMEAGO JS: !!! 
            cambia cualquier fecha en formato javascript a cosos como "just now", "12 seconds ago", "15 minutes ago, 2 hours ago, 3 days ago, 2 weeks ago, 6 months ago, 1 year ago.... in 3 minutes, in 24 hours, in 2 years, y asi :3
            Como si fuera una red social :0
            */ 

            <div className="row">
                {
                this.state.notes.map(note => (
                    <div className="col-md-4 p-2" key={note._id}>
                     <div className="card">
                         <div className="card-header d-flex justify-content-between">
                            <h5>{note.title}</h5>
                            <Link className="btn btn-seconday" to={"/edit/"+note._id}>
                              Edit
                            </Link>
                         </div>
                         <div className="card-body">
                            <p>{note.content}</p>
                            <p>{note.author}</p>
                            <p>{format(note.date)}</p>
                         </div>
                         <div className="card-footer">
                             <button className="btn btn-danger"
                             onClick={()=>this.deleteNote(note._id)}>
                                 Delete
                             </button>
                         </div>
                     </div>
                    </div>
                ))
                }
            </div>
        )
    }
}
