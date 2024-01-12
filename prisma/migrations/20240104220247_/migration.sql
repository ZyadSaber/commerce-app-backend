-- AlterTable
ALTER TABLE "app_pages" ADD COLUMN     "with_add" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "with_delete" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "with_edit" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "with_print" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "with_update_history" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user_permissions" ADD COLUMN     "can_add" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "can_delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "can_edit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "can_print" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "can_update_history" BOOLEAN NOT NULL DEFAULT false;
