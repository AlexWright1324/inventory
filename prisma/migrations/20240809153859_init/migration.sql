-- CreateTable
CREATE TABLE "Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'New Asset',
    "tag" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "locationId" INTEGER,
    CONSTRAINT "Asset_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userid" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "approved" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "_AssetToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AssetToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Asset" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AssetToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AssetToRequest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AssetToRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "Asset" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AssetToRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "Request" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AssetToCategory_AB_unique" ON "_AssetToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AssetToCategory_B_index" ON "_AssetToCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AssetToRequest_AB_unique" ON "_AssetToRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_AssetToRequest_B_index" ON "_AssetToRequest"("B");
