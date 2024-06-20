import { useParams, Link, useNavigate } from "react-router-dom";
import useApi, { BASE_PATH } from "../hooks/useApi";
import { getCoverPath } from "../utils";
import Loader from "./loader";
import "./profile.scss";

type Profile = {
  title: string;
  description?: string;
  first_publish_date: string;
  covers?: number[];
  cover_id?: number;
  links: {
    title: string;
    url?: string;
  }[];
  works?: string[];
  authors?: {
    author: {
      key: string;
    };
  }[];
};

export default function Profile() {
  const navigate = useNavigate();
  const { workId } = useParams();
  const { isPending, data } = useApi({
    key: `profile-${workId}` || "",
    url: `/works/${workId}.json`,
    enabled: true,
  });

  const profile: Profile = data && data;
  const coverId = profile && profile.covers?.length ? profile.covers[0] : 0;
  const authorLink =
    profile && profile.authors?.length ? profile.authors[0].author.key : "#";
  const description =
    data && typeof data.description === "string"
      ? data?.description
      : data?.description?.value;

  return (
    <div className="app__item-profile">
      {!isPending ? (
        <div>
          <div className="title">
            <h1>{profile.title}</h1>
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
          {profile.first_publish_date && (
            <span className="publish-year">
              Published: {profile.first_publish_date}
            </span>
          )}
          <div>
            <img
              src={getCoverPath(coverId, "L")}
              alt={profile.title}
              title={profile.title}
            />
            <div>
              {authorLink && (
                <a href={BASE_PATH + authorLink} target="_blank">
                  Author bio
                </a>
              )}
              <p>{description}</p>
              {profile.links?.length > 0 && (
                <div>
                  <span>References:</span>
                  <ul>
                    {profile.links.map((link) => (
                      <li key={link.url}>
                        <a href={link.url} target="_blank">
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {profile.works?.length && (
                <div>
                  <span>Genres:</span>
                  {profile.works?.map((work) => (
                    <Link to={`genre/${work}`} key={work}>
                      {work}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
