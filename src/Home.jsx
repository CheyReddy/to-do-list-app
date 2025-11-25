import React, { useState, useEffect, useRef } from "react";
import "./Home.css";

function Home() {
  const [query, setQuery] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDoList));
  }, [toDoList]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("todos"));
    if (savedList) {
      setToDoList(savedList);
    }
    inputRef.current.focus();
  }, []);

  const addItem = () => {
    if (query.trim().length > 0) {
      setToDoList([...toDoList, { id: Date.now(), text: query }]);
      setQuery("");
      inputRef.current.focus();
    }
  };

  const editItem = (index) => {
    const newValue = prompt("Edit your task: ", toDoList[index].text);
    if (newValue !== null && newValue.trim() !== "") {
      const updatedList = [...toDoList];
      updatedList[index].text = newValue;
      setToDoList(updatedList);
      inputRef.current.focus();
    }
  };

  const deleteItem = (index) => {
    const newList = toDoList.filter((_, i) => i !== index);
    setToDoList(newList);
    inputRef.current.focus();
  };

  return (
    <div className="container">
      <h1>To-Do List App</h1>
      <div className="input-area">
        <div>
          <input
            type="text"
            className="searchQuery"
            placeholder="Enter item to list"
            value={query}
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addItem();
              }
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="addItem" onClick={addItem}>
          Add
        </div>
      </div>
      <div className="list-container">
        {toDoList.map((item, index) => (
          <div className="item" key={index}>
            <div className="itemIndex">{index + 1}.</div>
            <div className="itemName">{item.text}</div>
            <div className="editItem">
              <button onClick={() => editItem(index)}>
                <span className="shortScreen">📝</span>
                <span className="fullScreen">Edit</span>
              </button>
            </div>
            <div className="deleteItem">
              <button onClick={() => deleteItem(index)}>
                <span className="shortScreen">🗑️</span>
                <span className="fullScreen">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
