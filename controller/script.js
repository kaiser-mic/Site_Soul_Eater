function registrar(){
    var nome = document.getElementById("registrar_nome").value
    var email = document.getElementById("registrar_email").value
    var senha = document.getElementById("registrar_senha").value
    
    if( nome.length == 0 ){
        alert( "O campo nome é obrigatório!")
    }else{
        if( price.length == 0 ){
            price = 0.0
        }
        var ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function(){
            if( this.readyState == 4 & this.status == 201){
                alert( "Usuario " + nome + " cadastrado!")
                buscarProdutos()
            }
        }
        ajax.open("POST" , "http://localhost:8001/registrar")
        ajax.setRequestHeader("Content-type" , 
                "application/x-www-form-urlencoded")
        ajax.send("nome=" + nome + "&email=" + email + "&senha=" + senha)
    }
}