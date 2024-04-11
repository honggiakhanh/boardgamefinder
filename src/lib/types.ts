export type Store = {
  store: string;
  products: BoardGame[] | undefined;
};

export type BoardGame = {
  name: string;
  price: string;
  fullImageLink: string;
  fullProductLink: string;
};
