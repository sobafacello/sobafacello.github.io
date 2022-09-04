document.getElementById("ok").addEventListener("click",function(){

    const email = document.getElementById("formEmail").value;
    const password = document.getElementById("formPassword").value;
    

    if(email && password){
        localStorage.setItem("user", email)
        window.location = "index.html";
    }else{
        window.location="login.html";
    }

})