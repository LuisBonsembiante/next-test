import { withRouter } from "next/router";
import Layout from "../components/MyLayout";

// reference purpose
const Content = withRouter(props => (
  <div>
    <h1>{props.router.query.title}</h1>
    <p>This is the blog POST content</p>
  </div>
));

// reference purpose
const Page = props => (
  <Layout>
    <Content />
  </Layout>
);

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?p>/g, "")}</p>
    <img src={props.show.image.medium} />
  </Layout>
);

// attached show to Post's props
Post.getInitialProps = async function(context) {
  const { id } = context.query;
  console.log(`Client print: ${id}`);

  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);
  console.log(show.summary);

  return { show };
};
export default Post;
