-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "address" TEXT NOT NULL PRIMARY KEY,
    "connected" BOOLEAN NOT NULL DEFAULT false,
    "ensName" TEXT NOT NULL DEFAULT '',
    "balance" TEXT NOT NULL DEFAULT '0',
    "lenshandle" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_User" ("address", "balance", "connected", "ensName") SELECT "address", "balance", "connected", "ensName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
