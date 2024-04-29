export type Store = {
  store: string;
  products: BoardGame[] | undefined;
};

export type StoreSelector = {
  name: string;
  baseUrl: string;
  searchUrl: string;
  selectors: {
    product: string;
    product_name: string;
    product_price: string;
    product_img: string;
    product_link: string;
  };
};

export type BoardGame = {
  name: string;
  price: string;
  fullImageLink: string;
  fullProductLink: string;
};

export type BGG_FetchResult = {
  items: {
    termsofuse: string;
    item: BGG_HotBoardGame[];
  };
};

export type BGG_HotBoardGame = {
  id: string;
  rank: string;
  thumbnail: {
    value: string;
  };
  name: {
    value: string;
  };
  yearpublished: {
    value: string;
  };
};
