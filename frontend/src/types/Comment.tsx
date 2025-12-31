export interface Comment {
  ID: number,
  Comment: string;
  CreatedBy: string;
  
  CreatedAt: string | null;
  Edited: boolean;
  EditedAt: string | null;

  Liked?: boolean;
  NoLikes: number;
  NoComments?: number;
  ParentComment: number | null;
}

export interface ReplyReturn {
  id:number,
  comment: string, 
  created_by: string
}