import { ItemModel } from "../models";
import { GridItem } from "./grid-item";
import "./section-row.scss";

type SectionRowProps = {
  items: ItemModel[];
};

export default function SectionRow({ items }: SectionRowProps) {
  return (
    <div className="app__section-row">
      {items.map((item) => (
        <GridItem item={item} key={item.key} />
      ))}
    </div>
  );
}
