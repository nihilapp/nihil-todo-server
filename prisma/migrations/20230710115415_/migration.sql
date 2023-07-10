-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('ADDED', 'PROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "TodoStatus" NOT NULL DEFAULT 'ADDED',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_todos" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "todoId" INTEGER NOT NULL,
    "status" "TodoStatus" NOT NULL DEFAULT 'ADDED',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,

    CONSTRAINT "sub_todos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "todos_userId_key" ON "todos"("userId");

-- CreateIndex
CREATE INDEX "todos_user_id_fk" ON "todos"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "sub_todos_userId_key" ON "sub_todos"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "sub_todos_todoId_key" ON "sub_todos"("todoId");

-- CreateIndex
CREATE INDEX "sub_todos_user_id_fk" ON "sub_todos"("userId");

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_todos" ADD CONSTRAINT "sub_todos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_todos" ADD CONSTRAINT "sub_todos_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "todos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
