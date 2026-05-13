-- CreateEnum
CREATE TYPE "SignupRole" AS ENUM ('owner', 'tenant');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "intendedRole" "SignupRole";
