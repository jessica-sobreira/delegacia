
export class CriminosoModel {
    public idCriminoso: number;

    constructor(
        public nome: string,
        public dataNascimento: Date,
    ) {
        this.idCriminoso = Math.random();
    }

}