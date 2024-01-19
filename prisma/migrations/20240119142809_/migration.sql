-- AlterTable
ALTER TABLE "labels_linked_pages" ADD COLUMN     "component_id" INTEGER;

-- CreateTable
CREATE TABLE "app_components" (
    "component_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "component_name" TEXT NOT NULL,

    CONSTRAINT "app_components_pkey" PRIMARY KEY ("component_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_components_component_name_key" ON "app_components"("component_name");

-- AddForeignKey
ALTER TABLE "labels_linked_pages" ADD CONSTRAINT "labels_linked_pages_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "app_components"("component_id") ON DELETE SET NULL ON UPDATE CASCADE;
