const { dbProd, dbDev, dbTest } = require("../../admin");

const relatorio = async () => {
  try {
    const ref = await dbProd.collection("Relatorio").get();
    const dev = dbDev.collection("Relatorio");
    const test = dbTest.collection("Relatorio");
    
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

module.exports = relatorio;