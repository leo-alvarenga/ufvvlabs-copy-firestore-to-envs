const fs = require("fs");

const areaDoConhecimento = require("./collections/areadoconhecimento");
const atividadeProposta = require("./collections/atividadeProposta");
const aula = require("./collections/aula");
const disciplina = require("./collections/disciplina");
const estudante = require("./collections/estudante");
const pratica = require("./collections/pratica");
const professor = require("./collections/professor");
const recursoPegagogico = require("./collections/recursoPedagogico");
const relatorio = require("./collections/relatorio");
const tipoRecurso = require("./collections/tipoRecurso");
const tuplaAcaoObjeto = require("./collections/tuplaAcaoObjeto");
const turma = require("./collections/turma");
const unidade = require("./collections/unidade");


const DIR_CHAVES_ACESSO_FIREBASE = "./admin/keys/";


/** 
 * Inicia e efetua a inserção de todos os dados do Banco de Dados de produção
 * para os demais ambientes, respeitando e mantendo os IDs dos documentos. 
*/
const iniciarTransporteDeDados = async () => {
    let count = undefined;
    
    fs.readdir(DIR_CHAVES_ACESSO_FIREBASE, (err, files) => {
        if (err) {
            console.error(err);
            
            return undefined;
        }

        if (!files.length || files.length < 3) {
            console.error("Por favor, certifique-se de colocar obter as chaves de \
            acesso aos ambientes de DEV, TEST e PROD, colocá-las na pasta \"keys\" antes de tentar novamente.");

            return undefined;
        }

        count = files.length;
    });

    if (count < 3) {
        return console.log("err");
    }

    await areaDoConhecimento();
    await atividadeProposta();
    await aula();
    await disciplina();
    await estudante();
    await pratica();
    await professor();
    await recursoPegagogico();
    await relatorio();
    await tipoRecurso();
    await tuplaAcaoObjeto();
    await turma();
    await unidade();
};

module.exports = iniciarTransporteDeDados;