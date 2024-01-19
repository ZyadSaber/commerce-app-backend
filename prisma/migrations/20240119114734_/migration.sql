-- CreateTable
CREATE TABLE "labels_linked_pages" (
    "row_key" SERIAL NOT NULL,
    "page_id" INTEGER NOT NULL,
    "label_id" TEXT NOT NULL,

    CONSTRAINT "labels_linked_pages_pkey" PRIMARY KEY ("row_key")
);

-- AddForeignKey
ALTER TABLE "labels_linked_pages" ADD CONSTRAINT "labels_linked_pages_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "app_pages"("page_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "labels_linked_pages" ADD CONSTRAINT "labels_linked_pages_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "labels"("label_id") ON DELETE RESTRICT ON UPDATE CASCADE;
