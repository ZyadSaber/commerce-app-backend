/*
  Warnings:

  - You are about to drop the column `component_name` on the `labels_linked_pages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "labels_linked_pages" DROP COLUMN "component_name",
ADD COLUMN     "component_id" INTEGER;

-- CreateTable
CREATE TABLE "app_components" (
    "component_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "eng_component_name" TEXT NOT NULL,
    "arab_component_name" TEXT NOT NULL,

    CONSTRAINT "app_components_pkey" PRIMARY KEY ("component_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_components_eng_component_name_key" ON "app_components"("eng_component_name");

-- CreateIndex
CREATE UNIQUE INDEX "app_components_arab_component_name_key" ON "app_components"("arab_component_name");

-- AddForeignKey
ALTER TABLE "labels_linked_pages" ADD CONSTRAINT "labels_linked_pages_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "app_components"("component_id") ON DELETE SET NULL ON UPDATE CASCADE;
