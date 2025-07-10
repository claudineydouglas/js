function calcularMedia( notas ) {

    let soma = 0;
    for( c = 0; c < notas.length; c++) {
        soma += notas[c];
    }

    media = soma / notas.length;

    return media;

}

let media; // escopo global

function aprovacao( notas ) {

    let media = calcularMedia( notas ); // escopo da função

    let condicao = media >= 8 ? "aprovado" : "reprovado";

    return 'Média: ' + media + ' - Resultado: ' + condicao;

}


// Função Recursivas

function contagemRegressiva(numero){

    console.log(numero);  
    
    let proximoNumero = numero - 1;

    if(proximoNumero > 0)
        contagemRegressiva(proximoNumero);

}

// contagemRegressiva(50);

// Formulário: envio de dados para cálculo da média

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formulario-02");
    const mensagem = document.querySelector(".mensagem");
    const resultado = document.getElementById("resultado");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita envio padrão

        let dados = new FormData(form);
        let erros = [];

        let nome = dados.get("nome").trim();
        let email = dados.get("email").trim();
        let telefone = dados.get("telefone").trim();
        let cidade = dados.get("cidade").trim();
        let uf = dados.get("uf").trim().toUpperCase();

        // Validação básica dos campos obrigatórios
        if (!nome) erros.push("Nome é obrigatório.");
        if (!email || !validarEmail(email)) erros.push("Email inválido ou em branco.");
        if (!cidade) erros.push("Cidade é obrigatória.");

        // Validação do telefone
        if (telefone && !/^\d{8,15}$/.test(telefone)) {
            erros.push("Telefone deve conter apenas números (8 a 15 dígitos).");
        }

        // Validação da UF
        if (uf && !/^[A-Z]{2}$/.test(uf)) {
            erros.push("UF deve conter exatamente 2 letras.");
        }

        if (erros.length > 0) {
            mensagem.innerHTML = `<p style="color: red;">${erros.join("<br>")}</p>`;
            resultado.innerHTML = "";
        } else {
            mensagem.innerHTML = `<p style="color: green;">Dados enviados com sucesso!</p>`;
            resultado.innerHTML = `
                <h3>Dados Recebidos:</h3>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${telefone || "Não informado"}</p>
                <p><strong>Cidade:</strong> ${cidade}</p>
                <p><strong>UF:</strong> ${uf || "Não informado"}</p>
            `;
            form.reset(); // limpa os campos após o envio
        }
    });

    function validarEmail(email) {
        // Expressão regular básica para validar email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});
