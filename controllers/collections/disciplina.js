const { dbProd, dbDev, dbTest } = require("../../admin");

const disciplina = async () => {
  const disciplinasRef = dbProd.collection("Disciplina");
  const dev = dbDev.collection("Disciplina");
  const test = dbTest.collection("Disciplina");

  try {
    const allDisciplinas = await disciplinasRef.get();

    let data = [];

    allDisciplinas.forEach((doc) => {
      data.push({
        nome: doc.data().nome,
        descricao: doc.data().descricao,
        areaDoConhecimento: doc.data().areaDoConhecimento,
        id: doc.id,
      });
    });

    data.forEach((disc) => {
      const { id, ...d } = disc;

      dev.doc(id).set({ ...d });
      test.doc(id).set({ ...d });
    })

  } catch (error) {
    console.error(error);
  }
};

module.exports = disciplina;