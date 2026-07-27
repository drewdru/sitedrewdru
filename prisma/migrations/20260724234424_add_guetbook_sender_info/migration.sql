/*
  Warnings:

  - Added the required column `name` to the `guestbook_messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guestbook_messages" ADD COLUMN     "contact" VARCHAR(50),
ADD COLUMN     "name" VARCHAR(25) NOT NULL;
