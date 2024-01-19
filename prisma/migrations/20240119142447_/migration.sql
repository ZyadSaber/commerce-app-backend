/*
  Warnings:

  - You are about to drop the column `arab_component_name` on the `app_components` table. All the data in the column will be lost.
  - You are about to drop the column `eng_component_name` on the `app_components` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "app_components_arab_component_name_key";

-- DropIndex
DROP INDEX "app_components_eng_component_name_key";

-- AlterTable
ALTER TABLE "app_components" DROP COLUMN "arab_component_name",
DROP COLUMN "eng_component_name";
