const prisma = require("../../../configs/connection");

// ----- # Get all boat # ----- //
const findKapal = async () => {
  try {
    const kapal = await prisma.dataKapal.findMany();

    return kapal;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Get Boat By Id # ----- //
const findKapalId = async (id) => {
  try {
    const kapal = await prisma.dataKapal.findMany({
      where: {
        users_id: id,
      },
    });
    return kapal;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Create Boat # ----- //
const insertKapal = async (dataKapal) => {
  try {
    const kapal = await prisma.dataKapal.create({
      data: {
        namaKapal: dataKapal.boatName,
        jenisKapal: dataKapal.tipeKapal,
        panjangKapal: parseInt(dataKapal.panjangKapal),
        kapasitasKapal: parseInt(dataKapal.kapasitasKapal),
        tanggalBuat: dataKapal.tanggalBuat,
        warna: dataKapal.color,
        chassis: dataKapal.chassis,
        noMesin: dataKapal.noMesin,
        users_id: dataKapal.id,
      },
    });

    return kapal;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Update Boat # ----- //
const updateKapal = async (id, dataKapal) => {
  try {
    const kapal = await prisma.dataKapal.update({
      where: {
        id: id,
      },
      data: {
        namaKapal: dataKapal.namaKapal,
        jenisKapal: dataKapal.jenisKapal,
        panjangKapal: dataKapal.panjangKapal,
        kapasitasPenumpang: dataKapal.kapasitasPenumpang,
        kapalAktif: dataKapal.kapalAktif,
        dermaga: dataKapal.dermaga,
      },
    });
    return kapal;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Delete Boat # ----- //
const deleteKapal = async (id) => {
  try {
    const kapal = await prisma.dataKapal.delete({
      where: {
        id,
      },
    });
    return kapal;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findKapal,
  findKapalId,
  insertKapal,
  updateKapal,
  deleteKapal,
};
