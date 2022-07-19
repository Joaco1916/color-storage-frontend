import React, { useEffect, useState } from "react";

const API = process.env.REACT_APP_API

export const Users = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [users, setUsers] = useState([]);

    const [id, setId] = useState(null)
    const [editing, setEditing] = useState(false);

    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if( !editing ){
            //const res = 
            await fetch(`${API}/users`, {
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            //const data = await res.json()
        } else {
            //const res = 
            await fetch(`${API}/users/${id}`, {
                method:'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            //const data = await res.json()
            setEditing(false)
        }

        setName('')
        setEmail('')
        setPassword('')

        await getUsers()
    }

    const getUsers = async () => {
        const res = await fetch(`${API}/users`)
        const data = await res.json()
        setUsers(data)
    }

    const editUser = async (id) => {
        const res = await fetch(`${API}/user/${id}`)
        const data = await res.json()

        setEditing(true)
        setId(id)

        setName(data.name)
        setEmail(data.email)
        setPassword(data.password)
    }

    const deleteUser = async (id) => {
        const userResponse = window.confirm('Estas seguro de querer borralo?')
        if( userResponse){
            const res = await fetch(`${API}/users/${id}`, {
                method:'DELETE'
            })
            const data = await res.json()
            console.log(data)
            await getUsers()
        }
    }

    useEffect( () => {
        getUsers()
    }, [])

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input 
                            type="text" 
                            onChange={handleChangeName} 
                            value={name}
                            className="form-control"
                            placeholder="Nombre"
                            autoFocus
                        />
                        <input 
                            type="email" 
                            onChange={handleChangeEmail} 
                            value={email}
                            className="form-control"
                            placeholder="Email"
                        />
                        <input 
                            type="password" 
                            onChange={handleChangePassword} 
                            value={password}
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <button className="btn btn-primary btn-block">
                        { editing ? 'Editar' : 'Create'}
                    </button>
                    { editing &&
                        <button 
                            className="btn btn-danger btn-block"
                            onClick={() => setEditing(false)}
                        >
                            Cancelar
                        </button>
                    }
                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map( (user, ind) => (
                            <tr key={ind}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button 
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={() => editUser(user._id)}
                                    >Edit</button>
                                    <button 
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={ () => deleteUser(user._id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}