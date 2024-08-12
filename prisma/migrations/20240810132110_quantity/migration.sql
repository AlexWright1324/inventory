-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'New Asset',
    "description" TEXT NOT NULL DEFAULT '',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "tag" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "locationName" TEXT,
    CONSTRAINT "Asset_locationName_fkey" FOREIGN KEY ("locationName") REFERENCES "Location" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("createdAt", "description", "id", "image", "locationName", "name", "tag", "updatedAt") SELECT "createdAt", "description", "id", "image", "locationName", "name", "tag", "updatedAt" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
