import Head from 'next/head';
import { useRouter } from "next/router";
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { useEffect, useState } from 'react';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [dataResponse, setDataResponse] = useState([]);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndpoint = `http://localhost:3000/api/getPost`;
      const postData = {
        method:"Post",
        headers: {"Content-Type":"application/json"},
        body: id,
      };

      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();
      // console.log(res);
      setDataResponse(res.entries);
    };
    getPageData();
    console.log(id);
  }, [router.query.id, router.isReady]);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        {dataResponse?.map((blog) => {
          return(
              <div>
                <h2 className={utilStyles.headingLg}>{blog.title}</h2>
                <p>{blog.Content}</p>
              </div>
            )
          })}
      </section>
    </Layout>
  );
};
