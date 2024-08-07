import React, { Fragment, useEffect, useState } from 'react'

export default function ListTodo() {
    const [todos,setTodos] = useState([])


    async function getAllToDos() {
        const res = await fetch("http://localhost:5000/todos")
        const data = await res.json()
        setTodos(data)
    }
    // deleted to do funtion
    async function deleteTodo(id) {
        try {
                const res = await fetch(`http://localhost:5000/todos/${id}`,{
                    method:"DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    
                });
                setTodos(todos?.filter(todo=>todo?.todo_id !== id))

        } catch (error) {
            console.error(error)
            
        }
        
    }

    useEffect(()=>{
        getAllToDos()
    },[todos])
  return (
   
    <Fragment>
        <div  className=" container border border-primary">
            <text className='text-center'>TO-DO List</text>
            <table class="table mt-5 text-cenyter">
    <thead >
      <tr >
        <th className='pl-4'>Description</th>
        <th className='pl-4'>Edit</th>
        <th className='pl-4'>Delete</th>
      </tr>
    </thead>
    {todos?.map((item)=>(
        <tr key={todos?.todo_id}>
            <td>{item.description}</td>
            <td><button  className="btn btn-primary">Edit</button></td>
            <td><button onClick={()=>deleteTodo(item?.todo_id)} className="btn btn-danger">Delete</button></td>

        </tr>
    ))}
    {/* <tbody>
      <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr>
        <td>July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
      </tr>
    </tbody> */}
  </table>
            
        </div>
    </Fragment>
  )
}
