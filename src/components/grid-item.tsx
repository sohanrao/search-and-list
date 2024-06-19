import { Link } from "react-router-dom";
import { ItemModel } from "../models";
import { getCoverPath } from "../utils";
import "./grid-item.scss";

type GridItemProps = {
  item: ItemModel;
};

export function GridItem({ item }: GridItemProps) {
  const { key, title, cover_id, authors, first_publish_year } = item;
  const author = authors?.length ? authors[0].name : "Data unavailable";
  const url = key || "";
  return (
    <Link className="app__grid-item" key={key} to={url}>
      <img alt={title} title={title} src={getCoverPath(cover_id)} />
      <div className="app__grid-item--title">{title}</div>
      <div>{author}</div>
      <div className="app__grid-item--year">
        Published: {first_publish_year}
      </div>
    </Link>
  );
}
