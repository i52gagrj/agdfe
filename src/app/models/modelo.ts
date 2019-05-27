export class Modelo{
	constructor(
		public id: number,		
		public descripcion: string,
        public codigo: string,
        public trimestre: number,
        public ejercicio: number,
        public tipo: string,
        public ruta: string,
        public usuario: number,
		public fechahora
	){}
}