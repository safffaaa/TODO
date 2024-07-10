import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

function ToDo() {

    const [item, setItem] = useState("")
    const [editItem, setEditItem] = useState("")
    const [editItemId, setEditItemId] = useState("")
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState(null)
    const [todo, setTodo] = useState(() => {
        return localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []
    })


    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todo))
        console.log(todo);
    }, [todo])


    const handle = (e) => {
        e.preventDefault();
        if (item === "") {
            setError("Item not be empty")
        } else {
            setError(null)
            setTodo((prev) => {
                return [
                    ...prev, {
                        id: crypto.randomUUID(),
                        title: item,
                        completed: false,
                    }
                ]
            })
            setItem('')
        }
    }

    const deleteItem = (itemID) => {
        setTodo((cur) => {
            return cur.filter((item) => item.id !== itemID)
        })
    }


    const statusItem = (id) => {
        setTodo((cur) => {
            return cur.map((item) => {
                if (item.id === id) {
                    if (item.completed) {
                        return {
                            ...item, completed: false
                        }
                    } else {
                        return {
                            ...item, completed: true
                        }
                    }
                }
                return item
            })
        })
    }

    const editTodo = (id, value) => {
        setEdit(!edit)
        setEditItem(value)
        setEditItemId(id)
    }

    const handleEdit = (e) => {
        e.preventDefault();
        if (editItem === "") {
            setError("item is empty")
        } else {
            setError(null);
            setTodo((cur) => {
                return cur.map((item) => {
                    if (item.id === editItemId) {
                        return { ...item, title: editItem };
                    }
                    return item;
                })
            })
            setEdit(false)
            setEditItem("")
            setEditItemId("")
        }
    }
    return (
        <div className='alert alert-success pt-5 d-flex justify-content-center min-vh-100 '>
            <div className="card w-50 p-3">
                <h3 className="text-center">TODO APP</h3>
                <hr />
                <form onSubmit={edit ? handleEdit : handle}>
                    <div className="form-group my-3">
                        <label htmlFor="">addItem</label>
                        <input type="text" className='form-control'
                            value={edit ? editItem : item}
                            onChange={(e) => edit ? setEditItem(e.target.value) : setItem(e.target.value)} />

                        {error && <small className='text-danger'>{error}</small>}
                    </div>
                    <button type='submit' className='btn btn-outline-success form-control'>{edit? "Update item" :"Add item"}</button>
                </form>
                <hr />
                <h5>TODO LIST:</h5>
                <div
                    className="table-responsive"
                >
                    <table
                        className="table table-success"
                    >
                        <tbody>
                            {todo.map((item) =>
                                <tr className="" key={item.id}>
                                    <td><p className={item.completed ? "text-danger" : ''} style={{ cursor: "pointer" }} onClick={() => statusItem(item.id)}>{item.title} </p></td>
                                    <td className='text-end'>
                                        <button className='btn btn-secondary me-2' onClick={() => editTodo(item.id, item.title)}>Edit</button>
                                        <button className='btn btn-danger ' onClick={() => deleteItem(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default ToDo