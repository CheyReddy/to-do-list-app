import React, { useState, useEffect, useRef } from "react";
import "./Home.css";

function Home() {
  const [query, setQuery] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addItem = () => {
    if (query.trim().length > 0) {
      setToDoList([...toDoList, query]);
      setQuery("");
      inputRef.current.focus();
    }
  };

  const editItem = (index) => {
    const newValue = prompt("Edit your task: ", toDoList[index]);
    if(newValue!==null && newValue.trim() !==""){
        const updatedList = [...toDoList];
        updatedList[index] = newValue;
        setToDoList(updatedList);
        inputRef.current.focus();
    }
  }

  const deleteItem = (index) => {
    const newList = toDoList.filter((_,i) => i !== index);
    setToDoList(newList);
    inputRef.current.focus();
  }

  return (
    <div className="container">
      <h1>To-Do List App</h1>

      <input
        type="text"
        className="searchQuery"
        placeholder="Enter item to list"
        value={query}
        ref={inputRef}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="addItem" onClick={addItem}>Add</button>
      <div className="list-container">
        {toDoList.map((item, index) => (
          <div className="item" key={index}>
            <div className="itemIndex">{index+1}.</div>
            <div className="itemName">{item}</div>
            <div className="editItem"><button onClick={() => editItem(index)}>
              <span className="shortScreen">📝</span>
              <span className="fullScreen">Edit</span>
              </button></div>
            <div className="deleteItem"><button onClick={() => deleteItem(index)}>
              <span className="shortScreen">🗑️</span>
              <span className="fullScreen">Delete</span>
              </button></div>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default Home;
