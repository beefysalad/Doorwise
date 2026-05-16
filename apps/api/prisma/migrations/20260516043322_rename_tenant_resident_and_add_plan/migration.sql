/*
  Warnings:

  - The values [tenant] on the enum `OrgRole` will be removed. If these variants are still used in the database, this will fail.
  - The values [tenant] on the enum `SignupRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `tenantProfileId` on the `OrganizationInvite` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PlanTier" AS ENUM ('free', 'starter', 'medium');

-- AlterEnum
BEGIN;
CREATE TYPE "OrgRole_new" AS ENUM ('owner', 'staff', 'resident');
ALTER TABLE "OrganizationMember" ALTER COLUMN "role" TYPE "OrgRole_new" USING ("role"::text::"OrgRole_new");
ALTER TABLE "OrganizationInvite" ALTER COLUMN "role" TYPE "OrgRole_new" USING ("role"::text::"OrgRole_new");
ALTER TYPE "OrgRole" RENAME TO "OrgRole_old";
ALTER TYPE "OrgRole_new" RENAME TO "OrgRole";
DROP TYPE "public"."OrgRole_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SignupRole_new" AS ENUM ('owner', 'resident');
ALTER TABLE "User" ALTER COLUMN "intendedRole" TYPE "SignupRole_new" USING ("intendedRole"::text::"SignupRole_new");
ALTER TYPE "SignupRole" RENAME TO "SignupRole_old";
ALTER TYPE "SignupRole_new" RENAME TO "SignupRole";
DROP TYPE "public"."SignupRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "plan" "PlanTier" NOT NULL DEFAULT 'free';

-- AlterTable
ALTER TABLE "OrganizationInvite" DROP COLUMN "tenantProfileId";
