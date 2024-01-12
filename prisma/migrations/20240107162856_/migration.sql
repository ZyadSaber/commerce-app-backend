/*
  Warnings:

  - The `page_disabled` column on the `app_pages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `run_in_modal` column on the `app_pages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `hidden` column on the `page_parent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "app_pages" DROP COLUMN "page_disabled",
ADD COLUMN     "page_disabled" BOOLEAN DEFAULT false,
DROP COLUMN "run_in_modal",
ADD COLUMN     "run_in_modal" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "page_parent" DROP COLUMN "hidden",
ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false;
