export type Category = {
  _id: string;
  order: number;
  name: string;
};

export type Agent = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  button: string;
  token: string;
  icon: string;
  category: string;
  prompt: string;
};
