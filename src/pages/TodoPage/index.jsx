import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
// import Button from '@material-tailwind/react/Button';

import Header from 'components/Todo/Header';
import ToDoList from 'components/Todo/ToDoList';
import ToDoForm from 'components/Todo/ToDoForm';

import { TodolistProvider } from 'context/todolist';

import * as api from 'api/todolists';

const TodoPage = () => {
	const [toDoList, setToDoList] = useState([]);
	const [currentTask, setCurrentTask] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [state, setState] = useState(true);
	const [selectedId, setSelectedId] = useState('')

	useEffect(() => {
		api.getActiveTodolist(setToDoList);
	}, [state]);

	const handleFilter = () => {
		api.archiveCompleteTodolist(state, setState, setToDoList);
	};

	const todolistProviderValues = {
		toDoList,
		setToDoList,
		currentTask,
		setCurrentTask,
		isEditing,
		setIsEditing,
		state,
		setState,
		selectedId,
		setSelectedId
	};

	// console.log('Loop line 38 of TodoPage');

	return (
		<TodolistProvider value={todolistProviderValues}>
			<Container className='text-center'>
				<Row>
					<Col className='m-auto mt-3 mb-5' xs={12} md={4}>
						<Header />
						<ToDoForm />
						<Button
							style={{ width: '100%' }}
							className=' mt-2'
							variant='primary'
							onClick={handleFilter}
						>
							Clear completed
						</Button>
						<ToDoList />
					</Col>
				</Row>
			</Container>
		</TodolistProvider>
	);
};

export default TodoPage;
