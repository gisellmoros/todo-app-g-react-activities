import React, { useState, useEffect } from 'react';
// import { Form } from 'react-bootstrap';
import { TextField, Button, Card } from '@material-ui/core';
import useStyles from './styles';
import validator from 'validator';
import Swal from 'sweetalert2';
import { api } from 'utils/constants';

export default function RegisterPage() {
	const classes = useStyles();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPw] = useState('');
	const [error, setError] = useState('');

	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if (
			firstName !== '' &&
			lastName !== '' &&
			email !== '' &&
			password !== '' &&
			confirmPassword !== '' &&
			password === confirmPassword
		) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}

		if (!firstName.trim('').length) {
			setError('Please provide a first name.');
		} else if (!lastName.trim('').length) {
			setError('Please provide a last name.');
		} else if (!email.trim('').length) {
			setError('Please provide an email.');
		} else if (!validator.isEmail(email)) {
			setError('Please provide a valid email.');
		} else if (!password.trim('').length) {
			setError('Please provide a password.');
		} else if (password.length < 8) {
			setError('Password must be at least 8 characters long.');
			// console.log(error);
		} else if (password !== confirmPassword) {
			setError('Passwords do not match.');
		} else {
			setError('');
		}
	}, [password, confirmPassword, email, firstName, lastName]);

	const register = e => {
		e.preventDefault();
		fetch(`${api}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
				confirmPassword: confirmPassword,
			}),
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.isSuccessful) {
					Swal.fire({
						icon: 'success',
						title: 'Registered Successfully.',
						text: data.message,
					});
					clear();
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Failed to register.',
						text: data.message,
					});
				}
			})
			.catch(err => console.log(err.message));
	};

	const clear = () => {
		setFirstName('');
		setLastName('');
		setEmail('');
		setPassword('');
		setConfirmPw('');
	};

	return (
		<div className='text-center'>
			<Card className={classes.card}>
				<h3>Register</h3>
				<form className={classes.root} onSubmit={registerUser}>
					<TextField
						type='text'
						size='small'
						required
						variant='outlined'
						label='Enter First Name'
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
					/>

					<TextField
						type='text'
						size='small'
						required
						variant='outlined'
						label='Enter Last Name'
						value={lastName}
						onChange={e => setLastName(e.target.value)}
					/>

					<TextField
						type='email'
						size='small'
						required
						variant='outlined'
						label='Enter Email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						type='password'
						size='small'
						required
						variant='outlined'
						label='Enter Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>

					<TextField
						type='password'
						size='small'
						required
						variant='outlined'
						label='Confirm Password'
						value={confirmPassword}
						onChange={e => setConfirmPw(e.target.value)}
					/>

					{isActive ? (
						<Button
							className={classes.button}
							variant='contained'
							color='primary'
							type='submit'
						>
							Submit
						</Button>
					) : (
						<Button
							className={classes.button}
							variant='contained'
							color='primary'
							type='submit'
							disabled
						>
							Submit
						</Button>
					)}
				</form>

				<div className={classes.errorContainer}>
					{!isActive && <p className={classes.error}>{error}</p>}
				</div>
			</Card>
		</div>
	);
}
