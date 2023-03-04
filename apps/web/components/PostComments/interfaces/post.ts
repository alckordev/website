import Author from "./author";

interface Post {
  id: number;
  thread: number;
  author: Author;
  message: string;
  likes: number;
  dislikes: number;
  numReports: number;
  isSpam: boolean;
  isApproved: boolean;
  parent: number | null;
  createdAt: string;
  updatedAt: string;
}

export default Post;
