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

export async function verifyCode(code, id) {
  try {
    const auction = await prisma.code.findFirst({
      where: {
        code: code,
        customerId: id
      },
      select: {auction: {
        select: {
          plate: true,
          auctioneer: {select: {account: {select: {name: true}}}},
          date: true
        }
      }}
    })
    return auction;
  } catch (e) {
    console.log(e)
  }

}

export async function addCustomerToAuction(plateNumber, plateId, id) {
  try {
    const code = plateNumber + Math.floor(100000 + Math.random() * 900000);
    const updateAuction = prisma.auction.update({
      where: {
        plate_id: plateId
      },
      data: {
        code: {create: {code: code, customerId: id}
        }
      }
    })
    return code;
  } catch (e) {
    console.log(e);
  }
}
