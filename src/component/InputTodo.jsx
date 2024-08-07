import React, { Fragment, useState } from "react";

export default function InputTodo() {
    const [description,setDescription] = useState("")

    async function submit(e) {
        e.preventDefault(); // Prevent default form submission behavior

        try {
           const body = {description}
            const res = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            console.log(res);
            
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            alert("Successfully added");
            console.log(await res.json()); // Await the JSON response
            setDescription(""); // Clear the input field
        } catch (error) {
            alert("Failed to add item: " + error.message);
        } finally {
            setDescription(""); // Clear the input field even if an error occurs
        }
    }
  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center mt-5">Postgres TO-DO List</h1>
        <form className="d-flex mt-5" >
            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="start writting your task" className="form-control" />
            <button onClick={submit} className="btn btn-success ml-2" >Add</button>
        </form>
        
      </div>
    </Fragment>
  );
}
