const { dbProd, dbDev, dbTest } = require("../../admin");

const turma = async () => {
  try {
    const ref = await dbProd.collection("Turma").get();
    const dev = dbDev.collection("Turma");
    const test = dbTest.collection("Turma");
    
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

module.exports = turma;