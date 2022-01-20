export const loginService = {
    login,
	logout
};
function login(username, password) {
    if((username === "nilesh" && password === "123456")||(username === "sandeep" && password === "98765")) {
        return true;
    }
	else return false;
}
function logout() {
        return true;
}