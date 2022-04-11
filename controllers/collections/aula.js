const { dbProd, dbDev, dbTest } = require("../../admin");

const aula = async () => {
  try {
    const aulasRef = await dbProd.collection("Aula").get();
    const dev = dbDev.collection("Aula");
    const test = dbTest.collection("Aula");
    
    let aulasData = [];

    aulasRef.forEach((doc) => {
      aulasData.push({ id: doc.id, ...doc.data() });
    });

    aulasData.forEach((au) => {
      const { id, ...a } = au;
      
      dev.doc(id).set({ ...a });
      test.doc(id).set({ ...a });
    });

  } catch (error) {
    console.error(error);
  }
};

module.exports = aula;