-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL DEFAULT E'',
    "last_name" TEXT DEFAULT E'',
    "language" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_permissions" (
    "user_permissions_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "page_id" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("user_permissions_id")
);

-- CreateTable
CREATE TABLE "app_pages" (
    "page_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "page_parent_id" INTEGER,
    "eng_page_name" TEXT NOT NULL,
    "arab_page_name" TEXT NOT NULL,
    "page_icon" TEXT NOT NULL DEFAULT E'',
    "page_link" TEXT NOT NULL,
    "page_disabled" VARCHAR(1) DEFAULT E'N',
    "run_in_modal" VARCHAR(1) DEFAULT E'N',

    CONSTRAINT "app_pages_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "page_parent" (
    "page_parent_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "eng_page_parent_name" TEXT NOT NULL,
    "arab_page_parent_name" TEXT NOT NULL,
    "hidden" VARCHAR(1) NOT NULL DEFAULT E'N',

    CONSTRAINT "page_parent_pkey" PRIMARY KEY ("page_parent_id")
);

-- CreateTable
CREATE TABLE "labels" (
    "label_id" TEXT NOT NULL,
    "eng_label" TEXT NOT NULL,
    "arab_label" TEXT NOT NULL,
    "eng_page_name" TEXT NOT NULL,
    "arab_page_name" TEXT NOT NULL,

    CONSTRAINT "labels_pkey" PRIMARY KEY ("label_id")
);

-- CreateTable
CREATE TABLE "page_label" (
    "row_key" SERIAL NOT NULL,
    "page_id" INTEGER NOT NULL,
    "label_id" TEXT NOT NULL,
    "eng_page_name" TEXT NOT NULL,
    "arab_page_name" TEXT NOT NULL,

    CONSTRAINT "page_label_pkey" PRIMARY KEY ("row_key")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "app_pages_eng_page_name_key" ON "app_pages"("eng_page_name");

-- CreateIndex
CREATE UNIQUE INDEX "app_pages_arab_page_name_key" ON "app_pages"("arab_page_name");

-- CreateIndex
CREATE UNIQUE INDEX "app_pages_page_link_key" ON "app_pages"("page_link");

-- CreateIndex
CREATE UNIQUE INDEX "page_parent_eng_page_parent_name_key" ON "page_parent"("eng_page_parent_name");

-- CreateIndex
CREATE UNIQUE INDEX "page_parent_arab_page_parent_name_key" ON "page_parent"("arab_page_parent_name");

-- CreateIndex
CREATE UNIQUE INDEX "labels_label_id_key" ON "labels"("label_id");

-- CreateIndex
CREATE UNIQUE INDEX "labels_eng_page_name_key" ON "labels"("eng_page_name");

-- CreateIndex
CREATE UNIQUE INDEX "labels_arab_page_name_key" ON "labels"("arab_page_name");

-- CreateIndex
CREATE UNIQUE INDEX "page_label_eng_page_name_key" ON "page_label"("eng_page_name");

-- CreateIndex
CREATE UNIQUE INDEX "page_label_arab_page_name_key" ON "page_label"("arab_page_name");

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "app_pages"("page_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_pages" ADD CONSTRAINT "app_pages_page_parent_id_fkey" FOREIGN KEY ("page_parent_id") REFERENCES "page_parent"("page_parent_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_label" ADD CONSTRAINT "page_label_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "app_pages"("page_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_label" ADD CONSTRAINT "page_label_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "labels"("label_id") ON DELETE RESTRICT ON UPDATE CASCADE;
