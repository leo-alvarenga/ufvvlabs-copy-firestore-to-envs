const { dbProd, dbDev, dbTest } = require("../../admin");

const atividadeProposta = async () => {
  try {
    const ref = await dbProd.collection("AtividadePropostaAula").get();
    const dev = dbDev.collection("AtividadePropostaAula");
    const test = dbTest.collection("AtividadePropostaAula");
    
    let data = [];

    ref.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    data.forEach((doc) => {
      const { id, ...d } = doc;
      
      dev.doc(id).set({ ...d });
      test.doc(id).set({ ...d });
    });

  } catch (error) {
    console.error(error);
  }
};

module.exports = atividadeProposta;