
export class CrimeModel {
    public idCrime: number;
    constructor(
        public descricao: string,
        public data: Date,
        public criminoso: string,
        public arma: string[],
    ) {
        this.idCrime = Math.random();
    }
}