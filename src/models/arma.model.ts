
export class ArmaModel {
    public idArma: number;
    constructor(
        public tipo: string,
        public serie: string,
    ) {
        this.idArma = Math.random();
    }
}