import { prisma } from "@/prisma/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import getUuid from "uuid-by-string";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = String(req.body.login);
  const password = String(req.body.password);
  const email = String(req.body.email);
  const uid = getUuid(username);
  const userExists = await prisma.users.findFirst({ where: { username } });
  const emailExists = await prisma.users.findFirst({ where: { email } });
  if (userExists) {
    res
      .status(200)
      .json({ message: "Użytkownik o podanym loginie już istnieje" });
    return;
  }
  if (emailExists) {
    res
      .status(200)
      .json({ message: "Użytkownik o podanym mailu już istnieje" });
    return;
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log(err);
    }
    await prisma.users.create({
      data: {
        username: username,
        password: hash,
        email: email,
        uid: uid,
      },
    });
    res.status(200).json({ message: "Użytkownik został utworzony" });
  });
}
