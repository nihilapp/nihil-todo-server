-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('WITHDRAW', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_auth" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hashedPassword" VARCHAR(300) NOT NULL,

    CONSTRAINT "user_auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_token" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hashedRefreshToken" VARCHAR(300),

    CONSTRAINT "user_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "withdrawal" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "text" VARCHAR(1000) DEFAULT '입력된 내용이 없습니다.',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "withdrawal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_userName_key" ON "user"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "user_auth_userId_key" ON "user_auth"("userId");

-- CreateIndex
CREATE INDEX "user_auth_user_id_fk" ON "user_auth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_token_userId_key" ON "user_token"("userId");

-- CreateIndex
CREATE INDEX "user_token_user_id_fk" ON "user_token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "withdrawal_userId_key" ON "withdrawal"("userId");

-- CreateIndex
CREATE INDEX "withdrawal_user_id_fk" ON "withdrawal"("userId");

-- AddForeignKey
ALTER TABLE "user_auth" ADD CONSTRAINT "user_auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_token" ADD CONSTRAINT "user_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdrawal" ADD CONSTRAINT "withdrawal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
