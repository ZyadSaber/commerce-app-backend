-- AlterTable
ALTER TABLE "user_permissions" ADD COLUMN     "refresh_time_out" INTEGER NOT NULL DEFAULT 30000;
