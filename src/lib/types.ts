export type Store = {
  store: string;
  products: BoardGame[] | undefined;
};

export type BoardGame = {
  name: string;
  price: number;
  fullImageLink: string;
  fullProductLink: string;
};
