// Article List
export type ArticleListItem = {
  title: string;
  nickname: string;
  writeTime: number;

  postId: number;
  recommend: number;
};

export type ArticleListRequestDto = {
  p: number;
};
export type ArticleListResponseDto = {
  content: ArticleListItem[];
};

// Article Content
export type Comment = {
  nickname: string;
  content: string;
  writeTime: number;
};

export type ArticleRequestDto = {
  articleIdx: number;
};
export type ArticleResponseDto = {
  postId: number;
  nickname: string;
  title: string;
  content: string;
  writeTime: number;
  like: number;
  dislike: number;
  filePathList: string[];
  comments: Comment[];
};

// Write Article

export type ArticleWriteRequestDto = {
  title: string;
  content: string;
  files: File[];
};
export type ArticleWriteResponseDto = Record<string, never>;

// Delete Article

export type ArticleDeleteRequestDto = {
  articleIdx: number;
};
export type ArticleDeleteResponseDeto = Record<string, never>;

// Like/Dislike Article

export type ArticleLikeRequestDto = Record<string, never>;
export type ArticleLikeResponseDto = Record<string, never>;

export type ArticleDislikeRequestDto = Record<string, never>;
export type ArticleDislikeResponseDto = Record<string, never>;
