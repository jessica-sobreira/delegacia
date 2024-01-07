
export class CriminosoModel {
    public idCriminoso: number;
    constructor(
        public nome: string,
        public dataNascimento: Date,
        public crimes: string[]
    ) {
        this.idCriminoso = Math.random();
    }
 }

 


