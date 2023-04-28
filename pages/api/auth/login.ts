import { prisma } from "@/prisma/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const value = await prisma.courses.findMany();
  res.status(200).send(value);
}
