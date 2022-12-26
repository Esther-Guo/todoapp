import React, {useState, useEffect} from 'react';
import axios from "axios";
import InputField from './InputField';
import DisplayArea from './DisplayArea';
import './styles/TodoTable.css';


const TodoTable = () => {
    const [todolist, setTodolist] = useState([]);
    const [inputText, setInputText] = useState("");
    const [todoCount, setTodoCount] = useState(0);

    const handleInputChange = (text) => {
        setInputText(text);
    }

    const handleSubmit = async () => {
        //e.preventDefault();
        if (inputText.length === 0) {
            return;
        }
        const newItem = {
            id: todoCount,
            text: inputText,
            checked: false,
        };
        setTodolist(todolist.concat(newItem));
        console.log(todolist)
        setInputText('');
        setTodoCount(todoCount+1);

        try {
            await axios.post("http://localhost:8800/todos", newItem);
        } catch (err) {
            console.log(err);
        }
    }

    const handleToggle = async (todoid) => {
        let todos = [...todolist];
        todos.forEach(todo => {if (todo.id === todoid) todo.checked = !todo.checked});
        setTodolist(todos);

        try {
            await axios.put("http://localhost:8800/todos/"+todoid);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (todoid) => {
        console.log(todoid)
        setTodolist(todolist => todolist.filter(todo => todo.id !== todoid));

        try {
            await axios.delete("http://localhost:8800/todos/"+todoid);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log("render")
        const fetchAllTodos = async () => {
            try {
                const res = await axios.get("http://localhost:8800/todos");
                setTodolist(res.data);
                console.log(res.data.slice(-1)[0].id)
                setTodoCount(res.data.slice(-1)[0].id+1);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllTodos()
    }, [])

    return (
        <div className="container">
            <InputField text = {inputText} onInputChange={handleInputChange} onInputSubmit={handleSubmit} />
            <div className="main">
                <DisplayArea todos = {todolist} onItemChecked={handleToggle} onItemDeleted={handleDelete}></DisplayArea>
            </div>
        </div>
    )
}

export default TodoTable;