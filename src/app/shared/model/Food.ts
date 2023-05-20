export class food{
  id!: string; // identificativo univoco del prodotto.
  name!: string; //  nome del prodotto
  price!: number; // prezzo del prodotto.
  tags?:string[]; // array di stringhe che rappresentano i tag associati al prodotto.
  favorite!:boolean; // booleano che indica se il prodotto è un preferito dell'utente.
  stars!:number; // numero che rappresenta le stelle del prodotto.
  imageUrl!: string; // URL dell'immagine del prodotto.
  origins!: string[]; //   array di stringhe che rappresentano le origini del prodotto.
  cookTime!:string; // stringa che rappresenta il tempo di cottura del prodotto.


}
