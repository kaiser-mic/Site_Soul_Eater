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
function login(event) {
    event.preventDefault();

    var usuario = document.getElementById("login_nome").value;
    var senha = document.getElementById("login_senha").value;

    if (!usuario || !senha) {
        alert("Usuário e senha são necessários!");
        return;
    }
    
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (this.readyState == 4) {
            // Primeiro, tentamos decodificar a resposta como JSON
            const resposta = JSON.parse(this.responseText);

            if (this.status == 200) { // 200: OK (Sucesso)
                alert(resposta.message); // "Login bem-sucedido"

                // **NOVO E ESSENCIAL:** Salva o token no localStorage
                localStorage.setItem('authToken', resposta.token);
                
                // Agora que o usuário está logado, podemos atualizar a interface
                atualizarUI();

            } else { // Trata qualquer outro status como erro (401, 500, etc.)
                alert("Erro: " + resposta.error);
            }
        }
    };

    ajax.open("POST", "http://localhost:8001/login", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("usuario=" + usuario + "&senha=" + senha);
}