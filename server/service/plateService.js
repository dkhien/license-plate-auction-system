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
  for (let plate of plateList) {
    plate.auction.date = plate.auction.date.getTime() / 1000;
  }
  return plateList
}

export async function createPlate(plate) {
  return prisma.plate.create({
    data: plate
  })
}
