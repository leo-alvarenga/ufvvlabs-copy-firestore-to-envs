const { dbProd, dbDev, dbTest } = require("../../admin");

const unidade = async (request, response) => {
  const unidadeRef = dbProd.collection("Unidade");
  const dev = dbDev.collection("Unidade");
  const test = dbTest.collection("Unidade");

  try {
    let res = [];
    let unidades = await unidadeRef.get();

    unidades.forEach((unidade) => {
      res.push({
        id: unidade.id,
        codigo: unidade.data().codigo,
        nome: unidade.data().nome,
      });
    });

    res.forEach((uni) => {
      const { id, ...u } = uni;

      dev.doc(id).set({ ...u });
      test.doc(id).set({ ...u });
    })
  } catch (error) {
    console.error(error);
  }
};

module.exports = unidade;