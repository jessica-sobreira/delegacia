
export class CriminosoModel {
    public idCriminoso: number;

    constructor(
        public nome: string,
        public dataNascimento: string,
    ) {
        this.idCriminoso = Math.random();
    }

}