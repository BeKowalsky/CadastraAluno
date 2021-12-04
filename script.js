function nomeAluno(elemento) {
    return valorNome = elemento.value; //Retorna o valor do input que pede o NOME
}

function sobrenomeAluno(elemento) {
    return valorSobrenome = elemento.value; //Retorna o valor do input que pede o SOBRENOME
}

function nascimentoAluno(elemento) {
    return valorNascimento = elemento.value; //Retorna o valor do input que pede a data de nascimento
}

function numeroAlunoOuResponsavel(elemento) {
    return valorNumero = elemento.value; //Retorna o valor do input que pede o Número do Aluno/Responsável
}

onload = function loaded() {
    let alunos = localStorage.getItem('Alunos') || null;
    const tabela = document.getElementById("alunos");

    //Se não tiver aluno cadastrado
    if (!alunos) {
        tabela.insertAdjacentHTML('afterbegin', `
            <h1 
                style="color: #000; text-decoration: none; text-align: center;"
            > 
                Não existem alunos cadastrados
            </h1>
        `)
    } else { //Quadno tiver aluno cadastrado
        alunos = JSON.parse(alunos)
        console.log(alunos)

        for (Aluno of alunos) {
            //Cria o item no html
            var aluno = document.createElement('tr');

            const nomeAtualDoAluno = Aluno.valorNome

            Aluno = `
            <td>
                ${Aluno.valorNome}
            </td> 
            <td>
                ${Aluno.valorSobrenome}
            </td>
            <td>
                ${Aluno.valorNascimento.split('-').reverse().join('/')}
            </td>
            <td>
                ${Aluno.valorIdade} anos
            </td>
            <td>
                ${Aluno.valorNumero}
            </td>
            <button 
                id="delete"
                onClick="deleteCurrentAlun(this, '${nomeAtualDoAluno}')"
            >
            Remover ${nomeAtualDoAluno}
            </button>
            `;
            //.split('-').reverse().join('/') --> Inverte a data para ficar no formato BR
            aluno.innerHTML = Aluno;
            tabela.appendChild(aluno);
        }
    }
}

function adicionaAluno() {

    //Pega a data atual e em seguida o ano
    var dataAtual = new Date();
    var anoAtual = dataAtual.getFullYear()

    //Pega a data de nascimento e em seguida o ano
    var dataNascimento = new Date(2020);
    var anoNascimento = dataNascimento.getFullYear();

    //Calcula a idade
    var valorIdade = anoAtual - anoNascimento;

    //Pega o Item alunos no Array
    var Alunos = JSON.parse(localStorage.getItem('Alunos')) || [];

    //Cria o objeto
    var dados = {
        valorNome,
        valorSobrenome,
        valorNascimento,
        valorIdade,
        valorNumero
    };

    //Armazena o item Alunos dentro do objeto
    var alunosCriados = [...Alunos, dados];
    localStorage.setItem('Alunos', JSON.stringify(alunosCriados));


    document.location.reload(true);
}

//Apaga o aluno
const deleteCurrentAlun = (element, nome) => {

    element.parentNode.parentNode.remove()
    let alunos = JSON.parse(localStorage.getItem('Alunos'))|| null;

    if(!alunos) return

    alunos = alunos.filter(aluno => (!aluno.valorNome === nome) ? aluno : '' )

    (localStorage.clear())
    JSON.stringify(localStorage.setItem('Alunos', alunos))

    document.location.reload(true);
}

//Mascara para Telefone
function mask(o) {
    setTimeout(function () {
        var v = mphone(o.value);
        if (v != o.value) {
            o.value = v;
        }
    }, 1);
}

function mphone(v) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}

//Quando apertar o botão chama a função que inicia tudo
var botaoApertado = document.getElementById("botao");
botaoApertado.addEventListener("click", adicionaAluno);
