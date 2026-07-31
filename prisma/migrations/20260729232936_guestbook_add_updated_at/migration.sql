-- AlterTable
ALTER TABLE "guestbook_messages" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
