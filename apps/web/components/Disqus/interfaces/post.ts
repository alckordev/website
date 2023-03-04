import Author from "./author";

interface Post {
  thread: string;
  author: Author;
  message: string;
  likes: number;
  dislikes: number;
  numReports: number;
  isSpam: boolean;
  isApproved: boolean;
  parent: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export default Post;
