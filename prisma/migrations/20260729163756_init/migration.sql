-- CreateTable
CREATE TABLE "guestbook_messages" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "visitor_id" VARCHAR(43) NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "contact" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guestbook_messages_pkey" PRIMARY KEY ("id")
);
