import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useEffect, useState } from 'react';

export default function Home({ allPostsData }) {
  const [dataResponse, setDataResponse] = useState([]);
  useEffect(() => {
    async function getPageData() {
      const apiUrlEndpoint = `http://localhost:3000/api/getdata-lib`;
      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();
      // console.log(res);
      setDataResponse(res.entries);
    }
    getPageData();
  }, []);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>This is a very concise introduction</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {dataResponse.map((blog) => {
            return(
              <li className={utilStyles.listItem} key={blog.Id}>
              <a href={`/posts/${blog.Id - 1}`}>{blog.title}</a>
              <br />
              {blog.date.slice(0,10)}
            </li>
            )
          })}
        </ul>
      </section>
    </Layout>
  );
};
