import prisma from "./prisma.js";

export async function authenticate (email, password) {
  try {
    const account = await prisma.account.findFirst({
      where: {email: email, password: password},
      select: {name: true, id: true, role: true},
    });
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
        break
      case "AUCTIONEER":
        await prisma.auctioneer.create({ data: {accountId: id,}})
        break
      default:
        await prisma.customer.create({ data: {accountId: id,}})
        break
    }
    return account;

  } catch (e) { console.log(e)}

}