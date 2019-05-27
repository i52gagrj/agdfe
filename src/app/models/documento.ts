export class Documento{
	constructor(
		public id: number,		
		public descripcion: string,
        public ruta: string,
        public tipo: string,
		public usuario: number,		
		public fechahora		
	){}
}