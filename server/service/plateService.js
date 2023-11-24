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

  return plateList.map(auction => ({
    ...auction,
    date: auction.date.getTime() / 1000
  }))
}

export async function updatePlate(plate) {
  
}

