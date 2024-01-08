
export class CrimeModel {
    public idCrime: number;
    constructor(
        public descricao: string,
        public dataCrime: Date,
    ) {
        this.idCrime = Math.random();
    }
}