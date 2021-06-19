import React from 'react';
import './styles.css';
import TodolistContext from 'context/todolist';
import { Card, Row, Col } from 'react-bootstrap';
import { Edit, Delete } from '@material-ui/icons';

import * as api from 'api/todolists';

const ToDo = ({ todo }) => {
	const {
		state,
		setState,
		toDoList,
		setToDoList,
		setCurrentTask,
		setIsEditing,
		setSelectedId
	} = React.useContext(TodolistContext);

	const handleToggle = async _id => {
		// const [selectedTodo] = toDoList.filter(todo => todo._id === _id);
		const selectedTodo = await api.getTodo(_id);
		// console.log('Selected task: ', selectedTodo.task);
		if (selectedTodo.complete) {
			api.makeIncomplete(_id, state, setState, setToDoList);
		} else {
			api.makeComplete(_id, state, setState, setToDoList);
		}

		setState(!state);
	};

	const updateTodoHandler = async _id => {
		const selectedTodo = await api.getTodo(_id);
		// console.log(selectedTodo.task);
		
		setIsEditing(true);
		setCurrentTask(selectedTodo.task);
		setSelectedId(_id)
	};

	const deleteTodoHandler = async _id => {
		// const [selectedTodo] = toDoList.filter(todo => todo._id === _id);
		const selectedTodo = await api.getTodo(_id);
		// console.log(selectedTodo.task);
		api.deleteTodo(_id, state, setState, setToDoList)
		setState(!state)
	};

	return (
		<div className='m-2'>
			<Card className='p-2'>
				<Row>
					<Col
						xs={9}
						onClick={e => handleToggle(e.target.id)}
						id={todo._id}
						className={todo.complete ? 'todo strike' : 'todo'}
					>
						{todo.task}
					</Col>
					<Col xs={3}>
						<Edit
							className='icon-hover'
							style={{ color: '#1A73E8', cursor: 'pointer' }}
							onClick={() => updateTodoHandler(todo._id)}
						/>
						<Delete
							className='icon-hover'
							style={{ color: '#1A73E8', cursor: 'pointer' }}
							onClick={() => deleteTodoHandler(todo._id)}
						/>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default ToDo;
