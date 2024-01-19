/*
  Warnings:

  - You are about to drop the column `arab_page_name` on the `labels` table. All the data in the column will be lost.
  - You are about to drop the column `eng_page_name` on the `labels` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "labels_arab_page_name_key";

-- DropIndex
DROP INDEX "labels_eng_page_name_key";

-- AlterTable
ALTER TABLE "labels" DROP COLUMN "arab_page_name",
DROP COLUMN "eng_page_name";
