import prisma from "./prisma.js";

export const getCustomerProfile = async (id) => {
  const profile = await prisma.customer.findFirst({
    where: {
      id: id
    },
    select: {
      account: true,
      id: true,
      code: {select: {auction: {select: {plate: true, date: true}}}}
    }
  });

  for (let item of profile.code) {
    item.auction.win = item.auction.plate.ownerId === id;
  }
  return profile;
}

export const getCustomerRegisteredAuctions = async (customerId) => {
  const auctions = await prisma.code.findMany({
    where: {
      customerId: customerId
    },
    select: {
      auction: {
        select: {
          id: true,
          plate: true,
          date: true
        }
      }
    }
  });
  
  return auctions;
}
