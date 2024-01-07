-- AddForeignKey
ALTER TABLE "crime" ADD CONSTRAINT "crime_id_criminoso_fkey" FOREIGN KEY ("id_criminoso") REFERENCES "criminoso"("id_criminoso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arma" ADD CONSTRAINT "arma_id_crime_fkey" FOREIGN KEY ("id_crime") REFERENCES "crime"("id_crime") ON DELETE RESTRICT ON UPDATE CASCADE;
