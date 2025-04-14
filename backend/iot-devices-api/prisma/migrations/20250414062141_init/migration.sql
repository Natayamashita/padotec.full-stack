-- CreateTable
CREATE TABLE "IotDevice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mac" TEXT NOT NULL,
    "timestamp" BIGINT NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "IotDevice_mac_key" ON "IotDevice"("mac");
