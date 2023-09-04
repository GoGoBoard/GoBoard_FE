export type ArticleComment = {
  nickname: string;
  content: string;
  writeTime: string;
};

export type ArticleCommentDTO = ArticleComment[];

export type CommentWriteRequestDto = {
  content: string;
};
export type CommentWriteResponseDto = {
  nickname: string;
  content: string;
  writeTime: number;
};
