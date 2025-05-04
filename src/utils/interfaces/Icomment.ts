export interface IAddComment {
  post_id: string | number;
  user_id: string | number;
  content: string;
  reply_id: string | null;
}

export interface IGetComments {
  post_id: string | number;
  user_id: string | number;
}

export interface IDeleteComment {
  id: string | number;
  user_id: string | number;
}

export interface IUpdateComment {
  id: string | number;
  user_id: string | number;
  content: string;
}

export interface IGetSingleComment {
  id: string | number;
  user_id: string | number;
}
