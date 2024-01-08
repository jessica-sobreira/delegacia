/*
  Warnings:

  - The primary key for the `arma` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_arma` on the `arma` table. All the data in the column will be lost.
  - You are about to drop the column `id_crime` on the `arma` table. All the data in the column will be lost.
  - You are about to drop the column `numero_serie` on the `arma` table. All the data in the column will be lost.
  - The primary key for the `crime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data_crime` on the `crime` table. All the data in the column will be lost.
  - You are about to drop the column `id_crime` on the `crime` table. All the data in the column will be lost.
  - You are about to drop the column `id_criminoso` on the `crime` table. All the data in the column will be lost.
  - The primary key for the `criminoso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data_nascimento` on the `criminoso` table. All the data in the column will be lost.
  - You are about to drop the column `id_criminoso` on the `criminoso` table. All the data in the column will be lost.
  - Added the required column `idCrime` to the `arma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serie` to the `arma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataCrime` to the `crime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCriminoso` to the `crime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataNascimento` to the `criminoso` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "arma" DROP CONSTRAINT "arma_id_crime_fkey";

-- DropForeignKey
ALTER TABLE "crime" DROP CONSTRAINT "crime_id_criminoso_fkey";

-- AlterTable
ALTER TABLE "arma" DROP CONSTRAINT "arma_pkey",
DROP COLUMN "id_arma",
DROP COLUMN "id_crime",
DROP COLUMN "numero_serie",
ADD COLUMN     "idArma" SERIAL NOT NULL,
ADD COLUMN     "idCrime" INTEGER NOT NULL,
ADD COLUMN     "serie" TEXT NOT NULL,
ADD CONSTRAINT "arma_pkey" PRIMARY KEY ("idArma");

-- AlterTable
ALTER TABLE "crime" DROP CONSTRAINT "crime_pkey",
DROP COLUMN "data_crime",
DROP COLUMN "id_crime",
DROP COLUMN "id_criminoso",
ADD COLUMN     "dataCrime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "idCrime" SERIAL NOT NULL,
ADD COLUMN     "idCriminoso" INTEGER NOT NULL,
ADD CONSTRAINT "crime_pkey" PRIMARY KEY ("idCrime");

-- AlterTable
ALTER TABLE "criminoso" DROP CONSTRAINT "criminoso_pkey",
DROP COLUMN "data_nascimento",
DROP COLUMN "id_criminoso",
ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "idCriminoso" SERIAL NOT NULL,
ADD CONSTRAINT "criminoso_pkey" PRIMARY KEY ("idCriminoso");

-- AddForeignKey
ALTER TABLE "crime" ADD CONSTRAINT "crime_idCriminoso_fkey" FOREIGN KEY ("idCriminoso") REFERENCES "criminoso"("idCriminoso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arma" ADD CONSTRAINT "arma_idCrime_fkey" FOREIGN KEY ("idCrime") REFERENCES "crime"("idCrime") ON DELETE RESTRICT ON UPDATE CASCADE;
