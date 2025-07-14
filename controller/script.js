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

function criarPersonagem(event) {
        event.preventDefault();

        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('Voce precisa estar logado para criar um personagem.');
            return;
        }


       const dadosPersonagem = {
            nome: document.getElementById("nome").value,
            aparencia: document.getElementById("aparencia").value,
            personalidade: document.getElementById("personalidade").value,
            historia: document.getElementById("historia").value,
            weapon_form: document.getElementById("weapon_form").value,
            forca: document.getElementById("forca").value,
            destreza: document.getElementById("destreza").value,
            constituicao: document.getElementById("constituicao").value,
            inteligencia: document.getElementById("inteligencia").value,
            sabedoria: document.getElementById("sabedoria").value,
            carisma: document.getElementById("carisma").value,
            atletismo: document.getElementById("atletismo").value,
            furtividade: document.getElementById("furtividade").value,
            vigor: document.getElementById("vigor").value,
            medicina: document.getElementById("medicina").value,
            sobrevivencia: document.getElementById("sobrevivencia").value,
            performance: document.getElementById("performance").value,
            intimidacao: document.getElementById("intimidacao").value,
            prestidigitacao: document.getElementById("prestidigitacao").value,
            conhecimento: document.getElementById("conhecimento").value,
            percepcao: document.getElementById("percepcao").value,
            persuasao: document.getElementById("persuasao").value,
            acrobacia: document.getElementById("acrobacia").value,
            resistencia: document.getElementById("resistencia").value,
            investigacao: document.getElementById("investigacao").value,
            intuicao: document.getElementById("intuicao").value,
            enganacao: document.getElementById("enganacao").value,
            habilidade: document.getElementById("habilidade").value,
            nivel_resonancia: document.getElementById("nivel_resonancia").value,
            sanidade: document.getElementById("sanidade").value,
            vida: document.getElementById("vida").value,
            tipo: document.getElementById("tipo").value
    }

        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (this.readyState == 4) {
                if(!this.responseText)
                    alert("Erro: O servidor não enviou uma resposta.");
                    return
                }
            const resposta = JSON.parse(this.responseText);
                if (this.status == 201) {
                    alert("personagem criado com sucesso:" + resposta.message)
                } else { alert("Erro ao criar o personagem: " + resposta.error);
                }    
        }
        ajax.open("POST", "http://localhost:8001/criar-personagem", true);
        ajax.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        ajax.setRequestHeader("Authorization", "Bearer " + token);

        ajax.send(JSON.stringify(dadosPersonagem));
    }
