import { prisma } from "@/prisma/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import getUuid from "uuid-by-string";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = req.body.username;
  const password = req.body.password;
  const uid = getUuid(username);

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log(err);
    }
    const value = await prisma.users.create({
      data: {
        username: username,
        password: hash,
        uid: uid,
      },
    });
    res.status(200).send(value);
  });
}
