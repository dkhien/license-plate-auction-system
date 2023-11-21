import prisma from "./prisma.js";
export async function createAuctioneer(auctioneer) {
  return prisma.auctioneer.create({
    data: {
      name: auctioneer.name,
      email: auctioneer.email,
      password: auctioneer.password,
      phone: auctioneer.phone
    }
  });
}
