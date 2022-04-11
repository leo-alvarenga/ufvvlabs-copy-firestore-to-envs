const { dbProd, dbDev, dbTest } = require("../../admin");


const areaDoConhecimento = async () => {
  const areasRef = dbProd.collection("AreaConhecimento");
  const areaDev = dbDev.collection("AreaConhecimento");
  const areaTest = dbTest.collection("AreaConhecimento");

  try {
    const allAreas = await areasRef.get();

    let data = [];

    allAreas.forEach((doc) => {
      data.push({
        nomes: doc.data().nomes.sort(),
      });
    });

    data.forEach(({ nomes }, index) => {
      areaDev.doc(`dev${index}`).set({
        nomes
      });

      areaTest.doc(`test${index}`).set({
        nomes
      });
    });

    console.log(data);
  } catch (err) {
    console.error(err)
  }
};

module.exports = areaDoConhecimento;