-- DropForeignKey
ALTER TABLE "sub_todos" DROP CONSTRAINT "sub_todos_todoId_fkey";

-- AddForeignKey
ALTER TABLE "sub_todos" ADD CONSTRAINT "sub_todos_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "todos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
