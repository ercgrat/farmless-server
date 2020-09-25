# Migration `20200925173949-task-model-2020-09-25`

This migration has been generated at 9/25/2020, 5:39:49 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "performedById" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    "hours" REAL NOT NULL,
    "tractorHours" REAL,
    "employeeId" INTEGER,

    FOREIGN KEY ("performedById") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("typeId") REFERENCES "TaskType"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "TaskType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
)

CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
)

CREATE TABLE "Enterprise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
)

PRAGMA foreign_keys=off;
DROP TABLE "Link";
PRAGMA foreign_keys=on
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200925135507-test..20200925173949-task-model-2020-09-25
--- datamodel.dml
+++ datamodel.dml
@@ -1,15 +1,37 @@
 datasource db {
     provider = "sqlite"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
 }
-model Link {
-    id          Int         @id @default(autoincrement())
-    createdAt   DateTime    @default(now())
-    description String
-    url         String
+model Task {
+    id              Int         @id @default(autoincrement())
+    date            DateTime
+    employee        Employee        @relation("Performed by", fields: [performedById], references: [id])
+    performedById   Int
+    type            TaskType        @relation("Is type of", fields: [typeId], references: [id])
+    typeId          Int
+    enterprise      Enterprise      @relation("Belongs to enterprise", fields: [enterpriseId], references: [id])
+    enterpriseId    Int
+    hours           Float
+    tractorHours    Float?
+}
+
+model TaskType {
+    id              Int         @id @default(autoincrement())
+    name            String
+}
+
+model Employee {
+    id              Int         @id @default(autoincrement())
+    name            String
+    tasks           Task[]
+}
+
+model Enterprise {
+    id              Int         @id @default(autoincrement())
+    name            String
 }
```


