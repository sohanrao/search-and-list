export type ErrorProps = {
  data?: string;
  internal: boolean;
  status: number;
  statusText?: string;
  message?: string;
};

export type Author = {
  key: string;
  name: string;
};

export type ItemModel = {
  title: string;
  key?: string;
  cover_id?: number;
  first_publish_year?: number;
  authors: Author[];
};
