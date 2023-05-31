import { prisma } from "@/prisma/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  // const user = await prisma.users.findMany({
  //   where: {
  //     OR: [
  //       {
  //         username: username,
  //       },
  //       {
  //         email: username,
  //       },
  //     ],
  //   },
  // });
  // console.log(user);
  // if (!user) {
  //   res.send("User not found");
  //   return;
  // }
  // const valid = await bcrypt.compare(password, user[0].password);
  // if (!valid) {
  //   res.send("Invalid password");
  //   return;
  // }
  // const value = {
  //   uid: user[0].uid,
  //   username: user[0].username,
  // };
  // res.status(200).json(value);
}
