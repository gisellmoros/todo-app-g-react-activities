import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import * as S from './styles';
import TodolistContext from 'context/todolist';
import * as api from 'api/todolists';

const ToDoForm = () => {
	const {
		selectedId,
		state,
		setState,
		setToDoList,
		currentTask,
		setCurrentTask,
		isEditing,
		setIsEditing,
	} = React.useContext(TodolistContext);
	const [newTask, setNewTask] = useState('');

	// const updateTodo = () => {
	// 	fetch(url, {
	// 		method: 'PUT',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			task: currentTask,
	// 		}),
	// 	})
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			console.log(data);
	// 		})
	// 		.catch(err => console.log(err));
	// };

	const addTaskHandler = async e => {
		e.preventDefault();
		if (isEditing) {
			console.log('Task updated.');
			api.updateTodo(selectedId, currentTask, state, setState, setToDoList);
			setIsEditing(false);
		} else {
			api.createTodo(newTask, state, setState, setToDoList);
		}
		
		setState(!state);
		setNewTask('');
		setCurrentTask('');
	};

	// const editTaskHandler = () => {
	// 	// updateTodo();
	// 	console.log('Task updated.');
	// 	setCurrentTask('');
	// 	setIsEditing(false);
	// };

	return (
		<Form onSubmit={addTaskHandler}>
			<S.Group>
				<Form.Control
					type='text'
					placeholder='Add new task'
					value={isEditing ? currentTask : newTask}
					onChange={e => {
						isEditing
							? setCurrentTask(e.target.value)
							: setNewTask(e.target.value);
					}}
				/>
				{!isEditing ? (
					<S.Btn type='submit'>Add task</S.Btn>
				) : (
					<S.Btn type='submit'>Save</S.Btn>
				)}
			</S.Group>
		</Form>
	);
};

export default ToDoForm;
