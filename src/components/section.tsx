import "./section.scss";
import useApi from "../hooks/useApi";
import Loader from "./loader";
import SectionRow from "./section-row";
import { Link } from "react-router-dom";

const limit = 5;

type SectionProps = {
  title: string;
  subject: string;
};

export default function Section({ title, subject }: SectionProps) {
  const { isPending, data } = useApi({
    key: `subject-${subject}`,
    url: `/subjects/${subject}.json?limit=${limit}`,
  });
  return (
    <section className="app__section">
      <div className="app__section--title">
        <h2>{title}</h2>
        <Link to={`genre/${subject}`}>See more</Link>
      </div>
      <div className="app__section--content">
        {!isPending ? <SectionRow items={data?.works} /> : <Loader />}
      </div>
    </section>
  );
}
