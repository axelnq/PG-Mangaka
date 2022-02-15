export default class User {
  id: string | undefined;
  name: string;
  username: string;
  password: string | undefined;
  avatar: Buffer;
  about: string;
  coins: number;
  creatorMode: boolean;
  email: string;
  library: number[];
  wishList: number[];
  favorites: number[];
  googleId: boolean

  constructor(
    name: string,
    username: string,
    avatar: Buffer,
    email: string,
    password?: string,
    about?: string,
    coins?: number,
    creatorMode?: boolean,
    library?: number[],
    wishList?: number[],
    favorites?: number[],
    id?: string,
    googleId?: boolean
  ) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password || undefined;
    this.avatar = avatar || undefined;
    this.about = about || "This is my Profile!";
    this.coins = coins || 0;
    this.creatorMode = creatorMode || false;
    this.library = library || [];
    this.wishList = wishList || [];
    this.favorites = favorites || [];
    this.id = id || undefined;
    this.googleId = googleId || false
  }
}

export function setCoins(user: User, coins: number): void {
  user.coins = coins;
}

export function addCoins(user: User, coins: number): void {
  setCoins(user, user.coins + coins);
}

export function removeCoins(user: User, coins: number): void {
  if (!(user.coins >= coins)) {
    throw new Error("Insuficient coins");
  }

  setCoins(user, user.coins - coins);
}

export function setCreatorMode(user: User, mode: boolean): void {
  user.creatorMode = mode;
}

export function addLibrary(user: User, mangaId: number): void {
  user.library = [...user.library, mangaId];
}

export function removeLibrary(user: User, mangaId: number): void {
  user.library = user.library.filter((manga) => manga !== mangaId);
}

export function addFavorites(user: User, mangaId: number): void {
  user.favorites = [...user.favorites, mangaId];
}

export function removeFavorites(user: User, mangaId: number): void {
  user.favorites = user.favorites.filter((manga) => manga !== mangaId);
}

export function addWishList(user: User, mangaId: number): void {
  user.wishList = [...user.wishList, mangaId];
}

export function removeWishList(user: User, mangaId: number): void {
  user.wishList = user.wishList.filter((manga) => manga !== mangaId);
}
/*
export function addCreated(user:User,mangaId:number):void {
    user.created = [...user.created, mangaId];
}

export function removeCreated(user:User,mangaId:number):void {
    user.created = user.created.filter(manga => manga !== mangaId);
}
*/
