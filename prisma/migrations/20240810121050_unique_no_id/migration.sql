/*
  Warnings:

  - You are about to drop the column `locationid` on the `Asset` table. All the data in the column will be lost.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Location` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'New Asset',
    "description" TEXT NOT NULL DEFAULT '',
    "tag" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "locationName" TEXT,
    CONSTRAINT "Asset_locationName_fkey" FOREIGN KEY ("locationName") REFERENCES "Location" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("createdAt", "description", "id", "image", "name", "tag", "updatedAt") SELECT "createdAt", "description", "id", "image", "name", "tag", "updatedAt" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
CREATE TABLE "new_Category" (
    "name" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Category" ("name") SELECT "name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE TABLE "new_Location" (
    "name" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Location" ("name") SELECT "name" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
CREATE TABLE "new__AssetToCategory" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AssetToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Asset" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AssetToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__AssetToCategory" ("A", "B") SELECT "A", "B" FROM "_AssetToCategory";
DROP TABLE "_AssetToCategory";
ALTER TABLE "new__AssetToCategory" RENAME TO "_AssetToCategory";
CREATE UNIQUE INDEX "_AssetToCategory_AB_unique" ON "_AssetToCategory"("A", "B");
CREATE INDEX "_AssetToCategory_B_index" ON "_AssetToCategory"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
