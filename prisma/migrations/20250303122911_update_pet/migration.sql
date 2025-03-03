/*
  Warnings:

  - Added the required column `age` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerName` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "notes" TEXT NOT NULL
);
INSERT INTO "new_Pet" ("id", "name", "photo") SELECT "id", "name", "photo" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
