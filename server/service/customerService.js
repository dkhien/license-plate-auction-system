import prisma from "./prisma.js";

export const getProfileWithPlate = async (id) => {
  const profile = await prisma.customer.findUnique({
    where: {
      accountId: id
    },
    select: {
      account: true,
      // plate: {select: {plateNumber: true, typeOfVehicle: true, city: true, price: true, ownerId: id},},
      code: {select: {auction: {select: {plate: true, date: true}}}}
    }
  });
  // const {code, plate, account} = profile;
  // const result = {
  //   profile : account,
  //   auction: code.auction
  // }

  return profile;
}