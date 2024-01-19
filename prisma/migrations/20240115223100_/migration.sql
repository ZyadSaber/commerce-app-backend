/*
  Warnings:

  - You are about to drop the `page_label` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `labels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "page_label" DROP CONSTRAINT "page_label_label_id_fkey";

-- DropForeignKey
ALTER TABLE "page_label" DROP CONSTRAINT "page_label_page_id_fkey";

-- AlterTable
ALTER TABLE "labels" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "page_label";
