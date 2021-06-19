import api from 'api';

export const getActiveTodolist = async setToDoList => {
	try {
		const { data } = await api.get('/todolist/active');
		setToDoList(data);
	} catch (err) {
		console.log(err);
	}
};

export const archiveCompleteTodolist = async (state, setState, setToDoList) => {
	try {
		await api.put(`/todolist/archive`);
		setState(!state);
		getActiveTodolist(setToDoList);
	} catch (err) {
		console.log(err);
	}
};

export const getTodo = async _id => {
	try {
		const { data } = await api.get(`/todolist/${_id}`);

		// console.log(data._id === _id);
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const makeComplete = async (_id, state, setState, setToDoList) => {
	try {
		await api.put(`/todolist/makecomplete/${_id}`);
		setState(!state);
		getActiveTodolist(setToDoList);
	} catch (err) {
		console.log(err);
	}
};

export const makeIncomplete = async (_id, state, setState, setToDoList) => {
	try {
		await api.put(`/todolist/makeincomplete/${_id}`);
		setState(!state);
		getActiveTodolist(setToDoList);
	} catch (err) {
		console.log(err);
	}
};

export const createTodo = async (newTask, state, setState, setToDoList) => {
	try {
		await api.post(`/todolist`, { task: newTask });
		setState(!state);
		getActiveTodolist(setToDoList);
	} catch (err) {
		console.log(err);
	}
};

export const updateTodo = async (_id, selectedTask, state, setState, setToDoList) => {
	try {
		// console.log(_id)
		await api.put(`/todolist/${_id}`, { task: selectedTask });
		setState(!state);
		getActiveTodolist(setToDoList);
	} catch (err) {
		console.log(err);
	}
};

export const deleteTodo = async (_id, state, setState, setToDoList) => {
	try {
		// console.log(_id)
		await api.delete(`/todolist/${_id}`);
		setState(!state);
		getActiveTodolist(setToDoList);
	} catch (err) {
		console.log(err);
	}
};


