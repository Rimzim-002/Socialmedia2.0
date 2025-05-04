export  interface ILike {
    id?: string|number;
    user_id: string|number;
    post_id?: string | null;
    comment_id?: string | null;
    type: 'post' | 'comment';
    status?: 'like';
  }
  export  interface IFetchLikes {
    user_id?: string|number 
    post_id?: string|number;  
    comment_id?: string|number; 
    type: 'post' | 'comment'; 
}