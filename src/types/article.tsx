export type ArticleDTO = {
  memberId: number;
  postId: number;
  title: string;
  content: string;

  writeTime: string;
};

export type ArticleListDTO = {
  content: ArticleDTO[];
};
