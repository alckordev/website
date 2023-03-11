interface Author {
  uid: string;
  name: string;
  email: string;
  picture: string | null;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export default Author;
