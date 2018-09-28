export function getCurrentLoggedInUser(){
    return localStorage.getItem('username');
}

export function setCurrentLoggedInUser(username){
    return localStorage.setItem('username', username);
}

export function logout(){
    localStorage.setItem('username', '');
}