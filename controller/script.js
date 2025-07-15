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
            if (!this.responseText) {
                alert("Erro: O servidor não enviou uma resposta.");
                return;
            }

            const resposta = JSON.parse(this.responseText);

            if (this.status == 200) {
                alert(resposta.message); 
                localStorage.setItem('authToken', resposta.token);
            } else {
                alert("Erro: " + resposta.error);
                document.getElementById("login_nome").value = '';
                document.getElementById("login_senha").value = '';
            }
        }
    };

    ajax.open("POST", "http://localhost:8001/login", true);

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

function exibirFicha(event) {
    event.preventDefault();

    const token = localStorage.getItem('authToken');

    if (!token) {
    alert("Você precisa estar logado para ver suas fichas!");
    return; 
    }
    var ajax = new XMLHttpRequest();
        
    ajax.onreadystatechange = function() {
        if(this.readyState == 4) {
            if (!this.responseText) {
                alert("Erro: O servidor não enviou uma resposta.");
                return;
            }
            const resposta = JSON.parse(this.responseText);

        if(this.status == 200){
            console.log("fichas recebidas:", resposta)
           if (resposta.length > 0) {
                    alert(`Você tem ${resposta.length} personagem(ns)!`);

                    for (const ficha of resposta) {
                        console.log(`--- Personagem: ${ficha.nome} ---`);
                        console.log(`  - Tipo: ${ficha.tipo}, Vida: ${ficha.vida}`);
                        console.log(`  - Atributos: Força ${ficha.forca}, Destreza ${ficha.destreza}, Inteligência ${ficha.inteligencia}`);
                        console.log("  - Objeto completo da ficha:", ficha);
                    }
                } else {
                    alert("Você ainda não tem nenhum personagem criado.");
                }
            } else {
                alert("Erro ao buscar as fichas: " + resposta.error);
            }
        }
    };

    ajax.open("GET", "http://localhost:8001/fichas", true);
    ajax.setRequestHeader("Authorization", "Bearer " + token);
    ajax.send();
}
