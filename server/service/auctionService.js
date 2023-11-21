import prisma from "./prisma.js";

export async function getAuctionByPlateId(id) {
  return prisma.auction.findUnique({
    where: {
      plate_id: id
    },
    select: {
      date: true
    }
  })
}

export async function createAuction(data) {
  // TODO: create auction and related plate
  const {city, date, plateNumber, auctioneer, typeOfVehicle} = data
  return prisma.auction.create({
    data: {
      date: date,
      plate: {
        create: {
          city: city,
          plateNumber: plateNumber,
          typeOfVehicle: typeOfVehicle,
        }
      },
      auctioneer: {
        connect: {
          email: auctioneer
        }
      }
    }
  });
}

export async function getALlDoneAuctions() {
  const data = await prisma.auction.findMany({
    where: {
      date: {
        gte: new Date()
      }
    },
    select: {
      plate: {
        select: {
          city: true,
          price: true,
          typeOfVehicle: true,
          plateNumber: true

        }
      },
      date: true
    }
  })
  return data.map(auction => ({
    ...auction,
    date: auction.date.getTime() / 1000
  }));
}
