/*
  Warnings:

  - You are about to drop the column `component_id` on the `labels_linked_pages` table. All the data in the column will be lost.
  - You are about to drop the `app_components` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "labels_linked_pages" DROP CONSTRAINT "labels_linked_pages_component_id_fkey";

-- AlterTable
ALTER TABLE "labels_linked_pages" DROP COLUMN "component_id";

-- DropTable
DROP TABLE "app_components";
