import Head from 'next/head';
import { useRouter } from "next/router";
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { Id } = router.query;
  const [dataResponse, setDataResponse] = useState([]);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndpoint = `http://localhost:3000/api/getdata-lib`;
      const postData = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Id: Id,
        })
      }
      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();
      // console.log(res);
      setDataResponse(res.entries);
    }
    getPageData();
  }, [router.query.Id, router.isReady]);
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
              {blog.title}
              <br />
              {blog.Id}
              <br />
              {blog.date}
            </li>
            )
          })}
        </ul>
      </section>
    </Layout>
  );
};
