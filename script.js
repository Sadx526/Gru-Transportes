function rastrear(inputId, resultadoId) {
  const codigo = document.getElementById(inputId).value.trim();
  const resultado = document.getElementById(resultadoId);

  if (!codigo) {
    resultado.innerHTML = '<div class="status"> Digite um código de rastreamento.</div>';
    return;
  }

  resultado.innerHTML = `
    <div class="status">
      <strong> Pedido ${codigo}</strong><br>
       Status: Em transporte<br>
       Última localização: Centro de Distribuição - São Paulo<br>
       Previsão de entrega: 2 dias úteis
    </div>
  `;
}

function calcularFrete() {
  const origem = document.getElementById("origem").value.trim();
  const destino = document.getElementById("destino").value.trim();
  const peso = Number(document.getElementById("peso").value);
  const resultado = document.getElementById("valorFrete");

  if (!origem || !destino || !peso || peso <= 0) {
    resultado.innerHTML = '<div class="frete-ok"> Preencha todos os campos corretamente.</div>';
    return;
  }

  const valor = 18 + peso * 4.5;

  resultado.innerHTML = `
    <div class="frete-ok">
       Frete estimado: R$ ${valor.toFixed(2).replace(".", ",")}
      <span style="float:right"> Prazo: 3 a 5 dias úteis</span>
    </div>
  `;
}
