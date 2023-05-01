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
  console.log(username, password, email);
  const uid = getUuid(username);

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
    res.status(200);
  });
}
