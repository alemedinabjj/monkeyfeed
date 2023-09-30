export interface CommentProps {
  content: Content;
  deleteComment: (comment: string) => void;
}

export interface Content {
  type: string;
  content: string;
}
