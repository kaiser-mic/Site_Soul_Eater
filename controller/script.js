function registrar(){
    var nome = document.getElementById("registrar_nome").value
    var email = document.getElementById("registrar_email").value
    var senha = document.getElementById("registrar_senha").value
    
    var ajax = new XMLHttpRequest()

    ajax.onreadystatechange = function(){
        if( this.readyState == 4 & this.status == 201){
            alert( "Usuario " + nome + " cadastrado!")
        }
    }
    ajax.open("POST" , "http://localhost:8001/registrar")
    ajax.setRequestHeader("Content-type" , 
            "application/x-www-form-urlencoded")
    ajax.send("usuario=" + nome + "&email=" + email + "&senha=" + senha)
}
function login(){
    var usuario = document.getElementById("login_nome").value
    var senha = document.getElementById("login_senha").value
    
    var ajax = new XMLHttpRequest()

    ajax.onreadystatechange = function(){
        if( this.readyState == 4 & this.status == 200){
            alert( "Usuario " + usuario + " logado!")
        } else if (this.readyState == 4 & this.status == 401) {
            alert("Usuario ou senha invalidos")
        }
    }
    ajax.open("POST" , "http://localhost:8001/login")
    ajax.setRequestHeader("Content-type" , 
            "application/x-www-form-urlencoded")
    ajax.send("usuario=" + usuario + "&senha=" + senha)
}