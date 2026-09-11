let mapa;
let marcadores = [];

const locais = [
    {
        tipo: "transporte",
        cidade: "São Paulo",
        destino: "Campinas",
        lat: -23.5505,
        lng: -46.6333,
        titulo: "São Paulo → Campinas",
        descricao: "Caminhão com espaço disponível",
        capacidade: "12 m³ · até 800 kg"
    },
    {
        tipo: "armazem",
        cidade: "Guarulhos",
        destino: "",
        lat: -23.4543,
        lng: -46.5333,
        titulo: "Armazém em Guarulhos",
        descricao: "Espaço para armazenamento",
        capacidade: "120 m³ disponíveis"
    },
    {
        tipo: "transporte",
        cidade: "São Paulo",
        destino: "Rio de Janeiro",
        lat: -22.9068,
        lng: -43.1729,
        titulo: "São Paulo → Rio de Janeiro",
        descricao: "Veículo com espaço parcial",
        capacidade: "8 m³ · até 500 kg"
    },
    {
        tipo: "armazem",
        cidade: "Campinas",
        destino: "",
        lat: -22.9099,
        lng: -47.0626,
        titulo: "Armazém em Campinas",
        descricao: "Galpão com espaço disponível",
        capacidade: "250 m³ disponíveis"
    }
];


function abrirAba(id) {

    const paginas = document.querySelectorAll(".pagina");

    paginas.forEach(pagina => {
        pagina.classList.remove("ativa");
    });

    const pagina = document.getElementById(id);

    if (pagina) {
        pagina.classList.add("ativa");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (id === "mapa") {

        setTimeout(() => {

            if (!mapa) {
                iniciarMapa();
            }

            mapa.invalidateSize();

        }, 200);

    }
}


function abrirLogin() {

    alert(
        "A área do cliente será disponibilizada na próxima etapa do projeto."
    );

}


function buscarHero() {

    const destino = document
        .getElementById("heroDestino")
        .value
        .trim();

    if (!destino) {

        alert("Digite uma cidade de destino.");

        return;
    }

    abrirAba("mapa");

    setTimeout(() => {

        document.getElementById("buscaMapa").value = destino;

        buscarMapa();

    }, 300);
}


function iniciarMapa() {

    mapa = L.map("map").setView(
        [-14.2350, -51.9253],
        4
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(mapa);

    mostrarMarcadores(locais);
}


function mostrarMarcadores(lista) {

    if (!mapa) {
        return;
    }

    marcadores.forEach(marker => {
        mapa.removeLayer(marker);
    });

    marcadores = [];

    lista.forEach(local => {

        const marker = L.marker([
            local.lat,
            local.lng
        ]).addTo(mapa);

        marker.bindPopup(`
            <strong>${local.titulo}</strong>
            <br>
            ${local.descricao}
            <br>
            <b>${local.capacidade}</b>
        `);

        marcadores.push(marker);

    });
}


function buscarMapa() {

    const busca = document
        .getElementById("buscaMapa")
        .value
        .toLowerCase()
        .trim();

    if (!busca) {

        mostrarMarcadores(locais);

        return;
    }

    const encontrados = locais.filter(local => {

        return (
            local.cidade.toLowerCase().includes(busca) ||
            local.destino.toLowerCase().includes(busca) ||
            local.titulo.toLowerCase().includes(busca)
        );

    });

    mostrarMarcadores(encontrados);

    if (encontrados.length > 0) {

        mapa.setView(
            [
                encontrados[0].lat,
                encontrados[0].lng
            ],
            7
        );

    } else {

        alert(
            "Nenhum espaço encontrado para essa busca."
        );

    }
}


function filtrarMapa(tipo, botao) {

    document
        .querySelectorAll(".map-filter")
        .forEach(btn => {
            btn.classList.remove("ativo");
        });

    botao.classList.add("ativo");

    if (tipo === "todos") {

        mostrarMarcadores(locais);

        return;
    }

    const filtrados = locais.filter(
        local => local.tipo === tipo
    );

    mostrarMarcadores(filtrados);
}


function mostrarAluguel(tipo, botao) {

    document
        .querySelectorAll(".choice")
        .forEach(btn => {
            btn.classList.remove("ativo");
        });

    botao.classList.add("ativo");

    const transporte =
        document.getElementById("filtroTransporte");

    const armazem =
        document.getElementById("filtroArmazem");

    if (tipo === "transporte") {

        transporte.classList.remove("hidden");
        armazem.classList.add("hidden");

    } else {

        transporte.classList.add("hidden");
        armazem.classList.remove("hidden");

    }
}


function buscarTransporte() {

    const origem =
        document.getElementById("transOrigem").value.trim();

    const destino =
        document.getElementById("transDestino").value.trim();

    const volume =
        Number(document.getElementById("transVolume").value);

    const peso =
        Number(document.getElementById("transPeso").value);

    const tempo =
        document.getElementById("transTempo").value;

    const resultado =
        document.getElementById("resultadoTransporte");


    if (!origem || !destino || !volume || !peso || !tempo) {

        resultado.innerHTML = `
            <div class="alerta">
                Preencha todos os campos para procurar um transporte.
            </div>
        `;

        return;
    }


    resultado.innerHTML = `

        <div class="resultado-card">

            <div class="location-type">
                POSSÍVEL COMPATIBILIDADE
            </div>

            <h3>
                ${origem} → ${destino}
            </h3>

            <p>
                Encontramos opções que podem atender
                sua necessidade de transporte.
            </p>

            <div class="resultado-dados">

                <span>
                    ${volume} m³
                </span>

                <span>
                    ${peso} kg
                </span>

                <span>
                    Data: ${tempo}
                </span>

            </div>

            <button
                class="small-btn"
                onclick="abrirAba('mapa')">
                Ver opções no mapa
            </button>

        </div>

    `;
}


function buscarArmazem() {

    const local =
        document.getElementById("armLocal").value.trim();

    const capacidade =
        Number(
            document.getElementById("armCapacidade").value
        );

    const tempo =
        document.getElementById("armTempo").value;


    const resultado =
        document.getElementById("resultadoArmazem");


    if (!local || !capacidade || !tempo) {

        resultado.innerHTML = `
            <div class="alerta">
                Preencha todos os campos para procurar um armazém.
            </div>
        `;

        return;
    }


    resultado.innerHTML = `

        <div class="resultado-card">

            <div class="location-type">
                POSSÍVEL COMPATIBILIDADE
            </div>

            <h3>
                Armazéns próximos de ${local}
            </h3>

            <p>
                Procurando espaços com capacidade
                compatível com sua necessidade.
            </p>

            <div class="resultado-dados">

                <span>
                    ${capacidade} m³
                </span>

                <span>
                    ${tempo}
                </span>

            </div>

            <button
                class="small-btn"
                onclick="abrirAba('mapa')">
                Ver armazéns no mapa
            </button>

        </div>

    `;
}


function enviarContato(event) {

    event.preventDefault();

    const nome =
        document.getElementById("contatoNome").value;

    const resultado =
        document.getElementById("contatoResultado");


    resultado.innerHTML = `

        <div class="sucesso">

            Obrigado, ${nome}!

            <br>

            Sua mensagem foi registrada.
            Em uma próxima versão ela será enviada
            diretamente para o sistema da Moveon.

        </div>

    `;

}


window.addEventListener("DOMContentLoaded", () => {

    const hash =
        window.location.hash.replace("#", "");

    if (hash) {

        const pagina =
            document.getElementById(hash);

        if (pagina) {
            abrirAba(hash);
            return;
        }

    }

    abrirAba("inicio");

});
