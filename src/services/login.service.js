import firebase from 'firebase/compat/app';
export const loginService = {
	login,
	logout,
	signup,
};

function login(username, password) {
	firebase
		.auth()
		.signInWithEmailAndPassword(username, password)
		.then(data => {
			console.log(data);
			return data;
		})
		.catch(err => {
			console.log(err);
			return err;
		});
	return false;
}

function logout() {
	return true;
}

function signup(username, password) {
	firebase
		.auth()
		.createUserWithEmailAndPassword(username, password)
		.then((res) => {
			console.log(res);
			return true;
		})
		.catch((error) => {
			alert(error.message);
			return false;
		});
}