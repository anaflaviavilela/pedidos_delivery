let totalPedido;

// CADASTRAR CLIENTE
function cadastrarCliente() {
    let nome = document.querySelector('[name="nome"]').value;
    let telefone = document.querySelector('[name="telefone"]').value;
    let endereco = document.querySelector('[name="endereco"]').value;
    let bairro = document.querySelector('[name="bairro"]').value;
    let cidade = document.querySelector('[name="cidade"]').value;
    let botaoCadastrar = document.querySelector('.cadastrarCliente');
    let botaoAdicionar = document.querySelector('.adicionar');

    if (camposObrigatoriosPreenchidos(nome, telefone, endereco, bairro, cidade)) {
        let cliente = criarCliente(nome, telefone, endereco, bairro, cidade);
        informacoesCliente(nome, telefone, endereco, bairro, cidade);
        botaoCadastrar.style.display='none';
        botaoAdicionar.style.display='initial';
        criarLinhas();
    } else {

        let camposEmBranco = [];

        if (nome.trim() === "") {
            camposEmBranco.push("Nome");
        }
        if (telefone.trim() === "") {
            camposEmBranco.push("Telefone");
        }
        if (endereco.trim() === "") {
            camposEmBranco.push("Endereço");
        }
        if (bairro.trim() === "") {
            camposEmBranco.push("Bairro");
        }
        if (cidade.trim() === "") {
            camposEmBranco.push("Cidade");
        }

        alert("Preencha todos os campos obrigatórios" + camposEmBranco);
    }

}


// ADICIONAR PEDIDO
function adicionar() {
    let botaoAdicionar = document.querySelector('.adicionar');
    let botaoLimparDados = document.querySelector('.button-limpar');
    let botaoEnviarPedido = document.querySelector('.button-enviar');


    let pizza = document.getElementById('pizza').value;
    let saborPizza = pizza.split('-')[0];
    let valorPizza =  pizza.split('R$ ')[1];

    let bebida = document.getElementById('bebida').value;
    let saborBebida = bebida.split(' -')[0];
    let valorBebida = bebida.split('R$ ')[1];

    totalPedido = parseFloat(valorPizza) + parseFloat(valorBebida);


    if (pizza.trim() !== "" && bebida.trim() !== "") {
        let pedido = criarPedido(pizza, saborPizza, valorPizza, bebida, saborBebida, valorBebida);
        informacoesPedido(pizza, bebida, totalPedido);
        botaoAdicionar.style.display = 'none';
        botaoLimparDados.style.display = 'initial';
        botaoEnviarPedido.style.display = 'initial';
    }
    else {
        console.log("Preencha os campos!");
    }


}


//LIMPAR DADOS
function limparDados() {

    //REMOVENDO ITENS DA LOCAL STORAGE
    localStorage.removeItem('pedido');


    let botaoEnviarPedido = document.querySelector('.button-enviar');
    let botaoLimparDados = document.querySelector('.button-limpar');
    let botaoCadastrar = document.querySelector('.cadastrarCliente');

    let elementosClientePedido = document.querySelectorAll('.cliente-pedido');
    elementosClientePedido.forEach(elemento => {
        elemento.innerHTML = '';
    });

    let elementosInputCadastro = document.querySelectorAll('.inputCadastro');
    elementosInputCadastro.forEach(input => {
        input.value = '';
    });

    let elementosSelectPedido = document.querySelectorAll('.pedido-input');
    elementosSelectPedido.forEach(select => {
        select.value = '';
    })

    totalPedido = 0;
    botaoLimparDados.style.display = 'none';
    botaoEnviarPedido.style.display = 'none';
    botaoCadastrar.style.display = 'initial';

}

//ENVIAR PEDIDO
function enviarPedido() {
    let asideElement = document.querySelector('.cliente-pedido');
    let nome = document.querySelector('[name="nome"]').value;
    let botaoEnviarPedido = document.querySelector('.button-enviar');
    let botaoLimparDados = document.querySelector('.button-limpar');

    let dataAtual = new Date();
    dataAtual.setMinutes(dataAtual.getMinutes() + 30);
    let dataFormatada = dataAtual.toLocaleString();


    let pedido = {
        cliente: {
            nome: document.querySelector('[name="nome"]').value,
            telefone: document.querySelector('[name="telefone"]').value,
            endereco: document.querySelector('[name="endereco"]').value,
            bairro: document.querySelector('[name="bairro"]').value,
            cidade: document.querySelector('[name="cidade"]').value
        },

        itens:{
            pizza: document.getElementById('pizza').value,
            bebida: document.getElementById('bebida').value
        },

        total: totalPedido
    }

    //CONVERTENDO O OBJETO EM STRING
    let pedidoString = JSON.stringify(pedido);

    //ARMAZENANDO O PEDIDO NA LOCAL STORAGE
    localStorage.setItem('pedido', pedidoString);


    let statusPedido = document.createElement('p');
    statusPedido.innerHTML = `Seu pedido está sendo preparado ${nome} e será <span>entregue ${dataFormatada}</span>`;
    statusPedido.classList.add('info-cliente', 'caixa-alta');
    statusPedido.style.lineHeight = '1.5';
    statusPedido.style.marginTop = '2rem';
    asideElement.appendChild(statusPedido);

    botaoEnviarPedido.style.display = 'none';
    botaoLimparDados.textContent = 'Cancelar Pedido';

}



// VALIDAR SE OS CAMPOS OBRIGATORIOS ESTÃO PREENCHIDOS
function camposObrigatoriosPreenchidos(nome, telefone, endereco, bairro, cidade) {

    return nome.trim() !== "" && telefone.trim() !== "" && endereco.trim() !== "" && bairro.trim() !== "" && cidade.trim() !== "";
}


// CRIAR CLIENTE
function criarCliente(nome, telefone, endereco, bairro, cidade) {
    return {
        nome: nome,
        telefone: telefone,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade
    };
}


// ADICIONANDO INFORMAÇÕES DO CLIENTE AO ASIDE PEDIDO
function informacoesCliente(nome, telefone, endereco, bairro, cidade) {
    let asideElement = document.querySelector('.cliente-pedido');

    // NOME DO CLIENTE
    let nomeDoCliente = document.createElement('p');
    nomeDoCliente.innerHTML = `<span>Nome:</span> ${nome}`;
    nomeDoCliente.classList.add('info-cliente', 'caixa-alta');
    asideElement.appendChild(nomeDoCliente);

    //TELEFONE DO CLIENTE
    let telefoneDoCliente = document.createElement('p');
    telefoneDoCliente.innerHTML = `<span>Telefone:</span> ${telefone}`;
    telefoneDoCliente.classList.add('info-cliente', 'caixa-alta');
    asideElement.appendChild(telefoneDoCliente);

    // ENDEREÇO DO CLIENTE
    let enderecoDoCliente = document.createElement('p');
    enderecoDoCliente.innerHTML = `<span>Endereço:</span> ${endereco}`;
    enderecoDoCliente.classList.add('info-cliente', 'caixa-alta');
    asideElement.appendChild(enderecoDoCliente);

    //BAIRRO DO CLIENTE
    let bairroDoCliente = document.createElement('p');
    bairroDoCliente.innerHTML = `<span>Bairro:</span> ${bairro}`;
    bairroDoCliente.classList.add('info-cliente', 'caixa-alta');
    asideElement.appendChild(bairroDoCliente);

    // CIDADE DO CLIENTE
    let cidadeDoCliente = document.createElement('p');
    cidadeDoCliente.innerHTML = `<span>Cidade:</span> ${cidade}`;
    cidadeDoCliente.classList.add('info-cliente', 'caixa-alta');
    asideElement.appendChild(cidadeDoCliente);

}


// INSERINDO PEDIDO NO ASIDE
function informacoesPedido(pizza, bebida, totalPedido) {
    let asideElement = document.querySelector('.cliente-pedido');

    //PIZZA
    let pizzaPedido = document.createElement('p');
    pizzaPedido.innerHTML = `<span>Pizza :</span> ${pizza}`;
    pizzaPedido.classList.add('info-cliente', 'caixa-alta');
    asideElement.appendChild(pizzaPedido);

    //BEBIDA
    let bebidaPedido = document.createElement('p');
    bebidaPedido.innerHTML = `<span>Bebida :</span> ${bebida}`;
    bebidaPedido.classList.add('info-cliente', 'caixa-alta');
    asideElement.appendChild(bebidaPedido);

    //TOTAL
    let total = document.createElement('p');
    total.innerHTML = `<span>Total :</span> ${totalPedido}`;
    total.classList.add('info-cliente', 'caixa-alta');
    asideElement.appendChild(total);

}


// CRIANDO OBJETO PEDIDO
function criarPedido(pizza, saborPizza, valorPizza, bebida, saborBebida, valorBebida) {
    return{
        pizza: pizza,
        saborPizza: saborPizza,
        valorPizza: valorPizza,
        bebida: bebida,
        saborBebida: saborBebida,
        valorBebida: valorBebida
    };
}

//CRIAR LINHAS
function criarLinhas() {
    let asideElement = document.querySelector('.cliente-pedido');

    let linhas = document.createElement('hr');
    linhas.classList.add('linhas');
    asideElement.appendChild(linhas);
}

    
