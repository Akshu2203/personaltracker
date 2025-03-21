const users=JSON.parse(localStorage.getItem("users")) ||[];
document.getElementById("register-form")?.addEventListener("submit",function(e){
    e.preventDefault();
    const username=document.getElementById("new-username").value;
    const password=document.getElementById("new-password").value;
    const number=document.getElementById("number").value;
    if(users.some(user=>user.username===username)){
        alert("username already taken.Please choose another:");
        return;
    }
    users.push({username,password,number});
    localStorage.setItem("users",JSON.stringify(users));
    alert("Registration successful ! Please log in.");
    window.location.href="login.html";
});
document.getElementById("login-form")?.addEventListener("submit",function(e){
    e.preventDefault();
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;
    if(username==="test"&& password==="pass123"){
        currentUser=username;
        localStorage.setItem("currentUser",username);
        window.location.href="index.html";
    }else{
        alert("Invalid Credentials.Please try again");
    }
});