function rastrear() {

    const codigo = document.getElementById("codigo").value;

    const resultado = document.getElementById("resultado");

    if (codigo === "") {

        resultado.innerHTML =
            "⚠️ Digite um código de rastreamento.";

        return;
    }

    resultado.innerHTML = `
         Pedido <strong>${codigo}</strong><br><br>
         Status: Em transporte<br>
         Localização: Centro de Distribuição - São Paulo<br>
         Previsão de entrega: 2 dias úteis
    `;
}
a

function rastrearSegundo() {

    const codigo =
        document.getElementById("codigo2").value;

    const resultado =
        document.getElementById("resultado2");

    if (codigo === "") {

        resultado.innerHTML =
            " Informe seu código de rastreamento.";

        return;
    }

    resultado.innerHTML = `
         Encomenda encontrada!<br><br>
        Código: ${codigo}<br>
         Em trânsito para o destino.<br>
         Última atualização: São Paulo - SP
    `;
}


function calcularFrete() {

    const origem =
        document.getElementById("origem").value;

    const destino =
        document.getElementById("destino").value;

    const peso =
        document.getElementById("peso").value;

    const resultado =
        document.getElementById("valorFrete");

    if (
        origem === "" ||
        destino === "" ||
        peso === ""
    ) {

        resultado.innerHTML =
            " Preencha todos os campos.";

        return;
    }

    let valor =
        18 + (Number(peso) * 4.5);

    resultado.innerHTML = `
         Frete estimado:
        <strong>
        R$ ${valor.toFixed(2).replace(".", ",")}
        </strong>

        <br><br>

         Prazo estimado:
        3 a 5 dias úteis
    `;
}