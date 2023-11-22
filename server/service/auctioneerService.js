import prisma from "./prisma.js";

import {register} from "./accountService.js";
export async function createAuctioneer(auctioneer) {
  try {
    const newAuctioneer = await register(auctioneer);
    newAuctioneer.password = null
    return newAuctioneer;
  } catch (e) {
    console.log(e)
  }
}
