import prisma from "./prisma.js";

export const getProfileWithPlate = async (id) => {
  const profile = await prisma.customer.findUnique({
    where: {
      id: id
    },
    select: {
      account: {select: {name: true}},
      plate: {select: {plateNumber: true, typeOfVehicle: true, city: true, price: true, ownerId: id}
      }
    }
  });
  return profile;
}