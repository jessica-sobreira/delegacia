-- CreateTable
CREATE TABLE "criminoso" (
    "id_criminoso" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criminoso_pkey" PRIMARY KEY ("id_criminoso")
);

-- CreateTable
CREATE TABLE "crime" (
    "id_crime" SERIAL NOT NULL,
    "id_criminoso" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_crime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crime_pkey" PRIMARY KEY ("id_crime")
);

-- CreateTable
CREATE TABLE "arma" (
    "id_arma" SERIAL NOT NULL,
    "id_crime" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "numero_serie" TEXT NOT NULL,

    CONSTRAINT "arma_pkey" PRIMARY KEY ("id_arma")
);
