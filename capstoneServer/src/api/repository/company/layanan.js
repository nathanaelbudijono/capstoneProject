const prisma = require("../../../configs/connection");

// ----- # Get all Layanan # ----- //
const findLayanan = async () => {
  try {
    const layanan = await prisma.layanan.findMany();

    return layanan;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Get Layanan By Id # ----- //
const findLayananId = async (id) => {
  try {
    const layanan = await prisma.layanan.findMany({
      where: {
        companyId: id,
      },
    });
    return layanan;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Create Layanan # ----- //
const insertLayanan = async (datalayanan) => {
  try {
    const layanan = await prisma.layanan.create({
      data: {
        jenisLayanan: datalayanan.jenisLayanan,
        harga: datalayanan.harga,
        pelabuhan: datalayanan.pelabuhan,
        satuanKerja: datalayanan.satuanKerja,
        companyId: datalayanan.id,
      },
    });

    return layanan;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Update Layanan # ----- //
const updateLayanan = async (id, datalayanan) => {
  try {
    const layanan = await prisma.layanan.update({
      where: {
        id: id,
      },
      data: {
        jenisLayanan: datalayanan.jenisLayanan,
        durasiPenggunaan: datalayanan.durasiLayanan,
        harga: datalayanan.harga,
        pelabuhan: datalayanan.pelabuhan,
        satuanKerja: datalayanan.satuanKerja,
        admin_id: datalayanan.admin_id,
      },
    });
    return layanan;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Delete Layanan # ----- //
const deleteLayanan = async (id) => {
  try {
    const layanan = await prisma.datalayanan.delete({
      where: {
        id,
      },
    });
    return layanan;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findLayanan,
  findLayananId,
  insertLayanan,
  updateLayanan,
  deleteLayanan,
};
