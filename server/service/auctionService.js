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

export async function getRoomInfo(code, id) {
  try {
    return  prisma.code.findFirst({
      where: {
        code: code, customerId: id, auction: {date: {gte: new Date()}}
      },
      select: {
        auction: {
          select: {
            plate: {select: {plateNumber: true,}},
            auctioneer: {select: {account: {select: {name: true}}}},
            date: true
          }
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
}

export async function createAuction(data) {
  // TODO: create auction and related plate
  const {city, date, plateNumber, auctioneer, typeOfVehicle} = data
  const dateTime = new Date(date * 1000)
  try {
    return prisma.auction.create({
      data: {
        date: dateTime,
        plate: {create: {city: city, plateNumber: plateNumber, typeOfVehicle: typeOfVehicle}},
        auctioneer: {connect: {id: auctioneer}}
      }
    });
  } catch (e) {
    console.log(e);
  }

}

export async function getALlDoneAuctions() {
  const data = await prisma.auction.findMany({
    where: {date: {gte: new Date()}},
    select: {
      plate: {
        select: {city: true, price: true, typeOfVehicle: true, plateNumber: true}
      },
      date: true
    }
  })
  return data.map(auction => ({
    ...auction,
    date: auction.date.getTime() / 1000
  }));
}

export async function addCustomerToAuction(plateId, id) {
  const auction = await prisma.auction.findUnique({
    where: {
      plate_id: plateId
    },
    select: {
      plate: { select: {plateNumber: true}}
    }
  })
  const code = auction.plate.plateNumber + Math.floor(100000 + Math.random() * 900000);
  if (!auction) {
    throw new Error("No auction found")
  }
  return prisma.auction.update({
    where: {
      plate_id: plateId
    },
    data: {
      code: {
        create: {code: code, customerId: id
        }
      }
    }
  })

}
