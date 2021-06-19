import api from 'api'

export const register = e => {
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