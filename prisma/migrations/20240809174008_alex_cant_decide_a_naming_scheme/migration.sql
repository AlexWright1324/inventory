/*
  Warnings:

  - You are about to drop the column `locationId` on the `Asset` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'New Asset',
    "tag" TEXT,
    "description" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "locationid" INTEGER,
    CONSTRAINT "Asset_locationid_fkey" FOREIGN KEY ("locationid") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("createdAt", "description", "id", "image", "name", "tag", "updatedAt") SELECT "createdAt", "description", "id", "image", "name", "tag", "updatedAt" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
