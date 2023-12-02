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
  const {city, date, plateNumber, auctioneer, typeOfVehicle} = data
  // const dateTime = new Date(date * 1000)
  try {
    return prisma.auction.create({
      data: {
        date: date,
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
    const customerId = parseInt(id)
    const auction = await prisma.code.findFirst({
      where: {
        code: code,
        customerId: customerId
      },
      select: {auction: {
        select: {
          id: true,
        }
      }}
    })
    // console.log(new Date(auction.auction.date) + process.env.AUCTION_DURATION * 60 * 1000)
    if (!auction) return {};
    // if (new Date(auction.auction.date) + process.env.AUCTION_DURATION * 60 * 1000 <= new Date()) return {};
  
    return auction.auction;
  } catch (e) {
    console.log(e)
  }

}

export async function addCustomerToAuction( plateId, id) {
  try {
    const existedCode = await prisma.code.findFirst({
      where: {
        customerId: id,
      }
    })

    const plate = await  prisma.plate.findFirst({
      where: {id: plateId},
      select: {plateNumber: true}
    })
    const {plateNumber} = plate
    const code = `${plateNumber}-${Math.floor(100000 + Math.random() * 900000)}`;
    const updateAuction = await prisma.auction.upsert({
      where: {
        plate_id: plateId
      },
      data: {
        code: {create: {code: code, customerId: id}
        }
      }
    })
    return {plateNumber, code};
  } catch (e) {
    console.log(e);
  }
}

export async function getAuctionById(id) {
  try {
    const auction = await prisma.auction.findUnique({
      where: {
        id: id,
      },
      select: {
        plate: {
          select: {
            plateNumber: true,
            typeOfVehicle: true,
            city: true,
            price: true,
          }
        },
        auctioneer: {select: {account: {select: {name: true}}}},
        bid: true,
        date: true
      }
    })

    return auction;
  } catch (e) {
    console.log(e);
  }
}

export async function updateAuctionBid(data) {
  try {
    let {price, time, userId: customer, auctionId} = data;
    auctionId = parseInt(auctionId)
    price = parseInt(price)
    customer = parseInt(customer)
    time = new Date(time)
    const bid =  await prisma.bid.create({
      data: {
        price: price,
        time: time,
        customerId: customer,
        auction: {connect: {id: auctionId}}
      }
    })
  } catch (e) {
    console.log(e)
  }
}

export async function updateWinner(data)   {
  let {customerId, price, auctionId} = data;
  customerId = parseInt(customerId)
  price = parseInt(price)
  auctionId = parseInt(auctionId)
  const auction = await prisma.auction.update({
    where: {id: auctionId},
    data: { plate: {
        update: {
          data: {price: price, ownerId: customerId}
        }
      }}
  })
  return auction
}

export async function getCurrentPrice(id) {
  const data = await prisma.bid.findFirst({
    where: {auctionId: id},
    select: {price: true},
    orderBy: {price: 'desc'}
  })
  if (!data || !data.price) return 40000;
  else return data.price;
}
