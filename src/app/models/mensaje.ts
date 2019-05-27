export class Mensaje{
	constructor(
		public id: number,		
		public texto: Text,
        public emisor: number,
        public receptor: number,
		public fechahora		
	){}
}