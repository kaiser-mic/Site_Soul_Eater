function login(event) { // <-- 1. Aceite o parâmetro "event"
    event.preventDefault(); // <-- 2. Adicione esta linha para impedir o recarregamento

    var usuario = document.getElementById("login_nome").value;
    var senha = document.getElementById("login_senha").value;

    if (!usuario || !senha) {
        alert("Usuário e senha são necessários!");
        return;
    }

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (this.readyState == 4) {
            // Verifica se a resposta está vazia ou não é um JSON válido
            if (!this.responseText) {
                alert("Erro: O servidor não enviou uma resposta.");
                return;
            }

            const resposta = JSON.parse(this.responseText);

            if (this.status == 200) { // 200: OK (Sucesso)
                alert(resposta.message); // "Login bem-sucedido"
                localStorage.setItem('authToken', resposta.token);
                // Idealmente, redirecione o usuário ou atualize a página aqui
                // Exemplo: window.location.href = 'perfil.html';
            } else { // Trata qualquer outro status como erro (401, 500, etc.)
                alert("Erro: " + resposta.error);
            }
        }
    };

    ajax.open("POST", "http://localhost:8001/login", true);
    // IMPORTANTE: O Express espera 'application/json' se você enviar JSON
    // ou 'x-www-form-urlencoded' se enviar como string. O seu está correto.
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("usuario=" + usuario + "&senha=" + senha);
}