
import React from 'react';
import Layout from '@/src/components/Layout';
import { Content } from '@carbon/react';

import ShowsPageContent from '@/src/content/ShowsPageContent/ShowsPageContent';

function ShowsPage({ shows }) {
  return (
    <Layout>
      <Content>
        <ShowsPageContent shows={shows}/>
      </Content>
    </Layout>
  )
};


export async function getServerSideProps() {
  const res = await fetch  (
    `https://api.tvmaze.com/search/shows?q=batman`
  );
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`)
  //console.log("data ", data);

  return {
    props: {
      shows: data,
    },
  };
}

export default ShowsPage;