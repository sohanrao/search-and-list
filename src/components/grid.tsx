import { useLocation, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { buildURLPath } from "../utils";
import Loader from "./loader";
import { GridItem } from "./grid-item";
import "./grid.scss";
import { Author, ItemModel } from "../models";
import Pagination from "./pagination";
import { useEffect, useState } from "react";

function mapResponseData(data: any) {
  const items = data.works ? data.works : data.docs;
  function buildAuthorList(names: string[], keys: string[]): Author[] {
    if (!names?.length || !keys?.length) {
      return [];
    }
    return names.map((name, index) => ({ name, key: keys[index] })) as Author[];
  }
  return items.map((item: any) => {
    return {
      title: item.title,
      cover_id: item.cover_id || item.cover_i,
      first_publish_year: item.first_publish_year,
      key: item.key,
      authors:
        item.authors || buildAuthorList(item.author_name, item.author_key),
    } as ItemModel;
  });
}

function getTotalCount(data: any) {
  const total = data.numFound ? data.numFound : data.work_count;
  return total;
}

export default function Grid() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const { type, value } = useParams();
  const location = useLocation();

  const { isPending, data, refetch } = useApi({
    key: `${type}-${value || location.search}-offset::${currentOffset}`,
    url: buildURLPath(type, value, location.search, currentOffset),
  });

  const items: ItemModel[] = data ? mapResponseData(data) : [];

  const pageChangeHandler = (offset: number) => {
    setCurrentOffset(offset);
  };

  useEffect(() => {
    refetch();
  }, [currentOffset]);

  useEffect(() => {
    if (currentOffset === 0) {
      refetch();
    } else {
      setCurrentOffset(0);
    }
  }, [type, value, location.search]);

  return (
    <div className="app__results-grid">
      <Pagination
        totalCount={data && getTotalCount(data)}
        onPageClick={pageChangeHandler}
        offset={currentOffset}
      />
      {!isPending ? (
        <div className="app__grid">
          {items &&
            items.map((item) => <GridItem item={item} key={item.key} />)}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
