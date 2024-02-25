-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);
