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

export type BGG_SearchResult = {
  items: {
    total: string;
    termsofsuse: string;
    item: BGG_SearchResult_BoardGame[];
  };
};

export type BGG_SearchResult_BoardGame = {
  type: string;
  id: string;
  name: {
    type: string;
    value: string;
  };
  yearpublished: {
    value: string;
  };
};

export type BGG_FetchResultWithID = {
  items: {
    termsofuse: string;
    item: BGG_BoardGameInfoByID;
  };
};

export type BGG_BoardGameInfoByID = {
  type: string;
  id: string;
  thumbnail: string;
  image: string;
  description: string;
  name:
    | [
        {
          type: string;
          sortindex: string;
          value: string;
        }
      ];
  yearpublished: {
    value: string;
  };
  minplayers: {
    value: string;
  };
  maxplayers: {
    value: string;
  };
  poll: any;
  playingtime: {
    value: string;
  };
  minplaytime: {
    value: string;
  };
  maxplaytime: {
    value: string;
  };
  minage: {
    value: string;
  };
  link: any;
};
