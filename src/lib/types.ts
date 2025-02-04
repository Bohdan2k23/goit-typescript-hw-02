export type ImageData = {
  total: number;
  total_pages: number;
  results: Result[];
};

export type Result = {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: User;
  urls: Urls;
  links: Links2;
};

export type User = {
  id: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  instagram_username: string;
  twitter_username: string;
  portfolio_url: string;
  profile_image: ProfileImage;
  links: Links;
};

export type ProfileImage = {
  small: string;
  medium: string;
  large: string;
};

export type Links = {
  self: string;
  html: string;
  photos: string;
  likes: string;
};

export type Urls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
};

export type Links2 = {
  self: string;
  html: string;
  download: string;
};
