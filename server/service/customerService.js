import prisma from "./prisma.js";

export const getProfileWithPlate = async (id) => {
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