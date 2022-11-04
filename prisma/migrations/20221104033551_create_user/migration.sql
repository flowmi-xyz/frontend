-- CreateTable
CREATE TABLE "User" (
    "address" TEXT NOT NULL PRIMARY KEY,
    "connected" BOOLEAN NOT NULL DEFAULT false,
    "ensName" TEXT NOT NULL DEFAULT '',
    "balance" TEXT NOT NULL DEFAULT '0'
);
