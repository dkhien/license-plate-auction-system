import prisma from "./prisma.js";

export async function authenticate (email, password) {
  try {
    const account = await prisma.account.findFirst({
      where: {email: email, password: password},
      select: {name: true, id: true, role: true, email: true},
    });

    const id = account.id;
    switch (account.role) {
      case "ADMIN":
        account.adminId = await prisma.admin.findUnique({where: {accountId: id}, select: {id: true}})
        account.adminId = account.adminId.id
        break
      case "AUCTIONEER":
        account.auctioneerId = await prisma.auctioneer.findUnique({where: {accountId: id}, select: {id: true}})
        account.auctioneerId = account.auctioneerId.id
        break
      default:
        account.customerId = await prisma.customer.findUnique({where: {accountId: id}, select: {id: true}})
        account.customerId = account.customerId.id
        console.log(account.customerId)
        break
    }

    return account;
  } catch (e) {
    console.log(e)
  }
}

export async function register (data){
  const {name, email, phone, password, citizenId, role} = data
  try {
    const account =  await prisma.account.create({
      data: {
        name: name, email: email, phone: phone, password: password, citizenId: citizenId, role: role ? role : "CUSTOMER",
      }
    });
    const id = account.id
    switch (role) {
      case "ADMIN":
        await prisma.admin.create({ data: {accountId: id,}})
        account.adminId = await prisma.admin.findUnique({where: {accountId: id}, select: {id: true}})
        account.adminId = account.adminId.id
        break
      case "AUCTIONEER":
        await prisma.auctioneer.create({ data: {accountId: id,}})
        account.auctioneerId = await prisma.auctioneer.findUnique({where: {accountId: id}, select: {id: true}})
        account.auctioneerId = account.auctioneerId.id
        break
      default:
        await prisma.customer.create({ data: {accountId: id,}})
        account.customerId = await prisma.customer.findUnique({where: {accountId: id}, select: {id: true}})
        account.customerId = account.customerId.id
        break
    }
    return account;

  } catch (e) { console.log(e)}

}