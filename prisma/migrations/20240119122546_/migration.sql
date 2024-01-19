-- DropForeignKey
ALTER TABLE "labels_linked_pages" DROP CONSTRAINT "labels_linked_pages_page_id_fkey";

-- AlterTable
ALTER TABLE "labels_linked_pages" ADD COLUMN     "component_name" TEXT,
ALTER COLUMN "page_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "labels_linked_pages" ADD CONSTRAINT "labels_linked_pages_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "app_pages"("page_id") ON DELETE SET NULL ON UPDATE CASCADE;
