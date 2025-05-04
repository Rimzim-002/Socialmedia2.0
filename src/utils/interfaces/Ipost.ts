export interface Ipost {
  user_id: string | number;
  image: string;
  caption: string;
}
export interface PostUpdate {
  user_id: string | number;
  id: string | number;
  updateData: Partial<Ipost>;
}
