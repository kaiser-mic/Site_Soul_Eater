window.addEventListener('DOMContentLoaded', exibirFicha);
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

function exibirFicha() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Você precisa estar logado para ver suas fichas!");
        window.location.href = 'login.html'; 
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
                console.log("Fichas recebidas do servidor:", resposta);
                const container = document.getElementById('fichas-container');
                container.innerHTML = '';
                if (resposta.length > 0) {
                    for (const ficha of resposta) {
                        const fichaHTML = `
                            <div id="ficha-card">
                                <h2 id="nome">${ficha.nome}</h2>
                                <p><strong>Aparência:</strong> ${ficha.aparencia}</p>
                                <p><strong>Personalidade:</strong> ${ficha.personalidade}</p>
                                <p><strong>Tipo:</strong> ${ficha.tipo}</p>
                                <p><strong>Vida:</strong> ${ficha.vida}</p>
                                <p><strong>Sanidade:</strong> ${ficha.sanidade}</p>
                                <ul id="atributos">
                                    <li>
                                        <strong class="principais">Força:</strong> ${ficha.forca}
                                        <ul class="pericias">
                                            <li><strong>Atletismo:</strong> ${ficha.atletismo}</li>
                                            <li><strong>Intimidação:</strong> ${ficha.intimidacao}</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong class="principais">Destreza:</strong> ${ficha.destreza}
                                        <ul class="pericias">
                                            <li><strong>Acrobacia:</strong> ${ficha.acrobacia}</li>
                                            <li><strong>Furtividade:</strong> ${ficha.furtividade}</li>
                                            <li><strong>Prestidigitação:</strong> ${ficha.prestidigitacao}</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong class="principais">Constituição:</strong> ${ficha.constituicao}
                                        <ul class="pericias">
                                            <li><strong>Vigor:</strong> ${ficha.vigor}</li>
                                            <li><strong>Resistência:</strong> ${ficha.resistencia}</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong class="principais">Inteligência:</strong> ${ficha.inteligencia}
                                        <ul class="pericias">
                                            <li><strong>Conhecimento:</strong> ${ficha.conhecimento}</li>
                                            <li><strong>Investigação:</strong> ${ficha.investigacao}</li>
                                            <li><strong>Medicina:</strong> ${ficha.medicina}</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong class="principais">Sabedoria:</strong> ${ficha.sabedoria}
                                        <ul class="pericias">
                                            <li><strong>Percepção:</strong> ${ficha.percepcao}</li>
                                            <li><strong>Intuição:</strong> ${ficha.intuicao}</li>
                                            <li><strong>Sobrevivência:</strong> ${ficha.sobrevivencia}</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong class="principais">Carisma:</strong> ${ficha.carisma}
                                        <ul class="pericias">
                                            <li><strong>Persuasão:</strong> ${ficha.persuasao}</li>
                                            <li><strong>Enganação:</strong> ${ficha.enganacao}</li>
                                            <li><strong>Performance:</strong> ${ficha.performance}</li>
                                        </ul>
                                    </li>
                                </ul>
                                <p><strong>habilidades:</strong> ${ficha.habilidade}</p>
                                <p><strong>Nivel de resonancia:</strong> ${ficha.nivel_resonancia}</p>
                            </div>
                        `;
                        container.innerHTML += fichaHTML;
                    }
                } else {
                    container.innerHTML = '<p>Você ainda não tem nenhum personagem criado.</p>';
                }
            }
        }
    };

    ajax.open("GET", "http://localhost:8001/fichas", true);
    ajax.setRequestHeader("Authorization", "Bearer " + token);
    ajax.send();
}