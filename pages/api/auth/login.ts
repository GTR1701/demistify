import { prisma } from "@/prisma/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;
  const user = await prisma.users.findFirst({
    where: {
      OR: [
        {
          username: username,
        },
        {
          email: username,
        },
      ],
    },
  });
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).send("Invalid password");
    return;
  }
  const value = {
    uid: user.uid,
    username: user.username,
  };
  res.status(200).json(value);
}
