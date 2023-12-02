import prisma from "./prisma.js";

export const getCustomerProfile = async (id) => {
  const profile = await prisma.customer.findUnique({
    where: {
      accountId: id
    },
    select: {
      account: true,
    }
  });
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
