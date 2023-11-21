-- CreateTable
CREATE TABLE "threads" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "threads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thread_likes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "thread_id" TEXT NOT NULL,

    CONSTRAINT "thread_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thread_replys" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "thread_id" TEXT NOT NULL,
    "reply" TEXT NOT NULL,

    CONSTRAINT "thread_replys_pkey" PRIMARY KEY ("id")
);
