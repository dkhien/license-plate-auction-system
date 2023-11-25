import prisma from "./prisma.js";


export async function getPlates() {
  return prisma.plate.findMany()
}

export async function getPlatesWithDate() {
  const plateList = await prisma.plate.findMany({
    select: {
      id: true,
      plateNumber: true,
      typeOfVehicle: true,
      city: true,
      auction: {
        select: {
          date: true
        }
      }
    }
  });

  return plateList.map(plate => ({
    ...plate,
    date: plate.auction.date.getTime() / 1000
  }))
}

export async function updatePlate(plate) {
  try {
    const updatePlate = await prisma.plate.update({
      where: {id: plate.id },
      data: {
        plateNumber: plate.plateNumber || undefined,
        typeOfVehicle: plate.typeOfVehicle || undefined,
        price: plate.price || undefined,
        owner: {connect: {id: plate.ownerId}} || undefined,
        status: plate.status || undefined,
        city: plate.city || undefined
      }
    })
    if (updatePlate) return updatePlate;
  } catch (e) {
    console.log(e);
  }
}

