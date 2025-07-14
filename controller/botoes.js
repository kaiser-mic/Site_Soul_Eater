let limite = 14;
let limite_adicional = 15;
let limiteText = document.getElementById("limite");
let limite_adicionalText = document.getElementById("limite_adicional");
function Aumentar(Atributo) {
  const input = document.getElementById(Atributo);
  const valorMaximo = parseInt(input.max);
  let valorAtual = parseInt(input.value);
  if (valorAtual < valorMaximo && limite > 0) {
    input.value = valorAtual + 1;
    limite--
    limiteText.textContent = limite;
}
}
function Diminuir(Atributo) {
    const input = document.getElementById(Atributo);
    const valorMinimo = parseInt(input.min);
    let valorAtual = parseInt(input.value);
    if (valorAtual > valorMinimo && limite < 27) {
        input.value = valorAtual - 1;
        limite++;
        limiteText.textContent = limite;
  }
}
function Aumentar_adicional(Atributo) {
    const input = document.getElementById(Atributo);
    const valorMaximo = parseInt(input.max);
    let valorAtual = parseInt(input.value);
    if (valorAtual < valorMaximo && limite_adicional > 0) {
        input.value = valorAtual + 1;
        limite_adicional--
        limite_adicionalText.textContent = limite_adicional;
}
}
function Diminuir_adicional(Atributo) {
    const input = document.getElementById(Atributo);
    const valorMinimo = parseInt(input.min);
    let valorAtual = parseInt(input.value);
    if (valorAtual > valorMinimo && limite_adicional < 27) {
        input.value = valorAtual - 1;
        limite_adicional++;
        limite_adicionalText.textContent = limite_adicional;
  }
}
function Calcular_atributos() {
    forca = document.getElementById("forca").value - 8;
    destreza = document.getElementById("destreza").value - 8;
    constituicao = document.getElementById("constituicao").value - 8;
    inteligencia = document.getElementById("inteligencia").value - 8;
    sabedoria = document.getElementById("sabedoria").value - 8;
    carisma = document.getElementById("carisma").value - 8;
    //força
    atletismo = document.getElementById("atletismo");
    intimidacao = document.getElementById("intimidacao");
    //destreza
    acrobacia = document.getElementById("acrobacia");
    furtividade = document.getElementById("furtividade");
    prestidigitacao = document.getElementById("prestidigitacao");
    //constituicao
    vigor = document.getElementById("vigor");
    resistencia = document.getElementById("resistencia");
    //inteligencia
    conhecimento = document.getElementById("conhecimento");
    investigacao = document.getElementById("investigacao");
    medicina = document.getElementById("medicina");
    //sabedoria
    percepcao = document.getElementById("percepcao");
    intuicao = document.getElementById("intuicao");
    sobrevivencia = document.getElementById("sobrevivencia");
    //carisma
    persuasao = document.getElementById("persuasao");
    enganacao = document.getElementById("enganacao");
    performance = document.getElementById("performance");

    atletismo.value = Math.floor(forca/2);
    atletismo.min = atletismo.value;
    intimidacao.value = Math.floor(forca/2);
    intimidacao.min = intimidacao.value;
    
    acrobacia.value = Math.floor(destreza/2);
    acrobacia.min = acrobacia.value;
    furtividade.value = Math.floor(destreza/2);
    furtividade.min = furtividade.value;
    prestidigitacao.value = Math.floor(destreza/2);
    prestidigitacao.min = prestidigitacao.value;

    vigor.value = Math.floor(constituicao/2);
    vigor.min = vigor.value;
    resistencia.value = Math.floor(constituicao/2);
    resistencia.min = resistencia.value;

    conhecimento.value = Math.floor(inteligencia/2);
    conhecimento.min = conhecimento.value;
    investigacao.value = Math.floor(inteligencia/2);
    investigacao.min = investigacao.value;
    medicina.value = Math.floor(inteligencia/2);
    medicina.min = medicina.value;

    percepcao.value = Math.floor(sabedoria/2);
    percepcao.min = percepcao.value;
    intuicao.value = Math.floor(sabedoria/2);
    intuicao.min = intuicao.value;
    sobrevivencia.value = Math.floor(sabedoria/2);
    sobrevivencia.min = sobrevivencia.value;

    persuasao.value = Math.floor(carisma/2);
    persuasao.min = persuasao.value;
    enganacao.value = Math.floor(carisma/2);
    enganacao.min = enganacao.value;
    performance.value = Math.floor(carisma/2);
    performance.min = performance.value;
    
}