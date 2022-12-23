import React, {useState, useEffect} from 'react';
import axios from "axios";
import InputField from './InputField';
import DisplayArea from './DisplayArea';

const TodoTableAlt = () => {
    const [todolist, setTodolist] = useState([]);
    const [inputText, setInputText] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [todoCount, setTodoCount] = useState(6);

    const handleInputChange = (text) => {
        setInputText(text);
    }

    const handleSubmit = () => {
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
    setInputText('');
    setTodoCount(todoCount+1);
    // this.setState(prevState => ({
    //     todolist: prevState.todolist.concat(newItem),
    //     inputText: '',
    //     todoCount: prevState.todoCount+1,
    // }));
    
    }

    useEffect(() => {
        const fetchAllTodos = async () => {
            try {
                const res = await axios.get("http://localhost:8800/todos");
                setTodolist(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllTodos()
    }, [])
    return (
        <div>
            <InputField text = {inputText} onInputChange={handleInputChange} onInputSubmit={handleSubmit} />
            <DisplayArea todos = {todolist}></DisplayArea>
        </div>
    )
}

export default TodoTableAlt;