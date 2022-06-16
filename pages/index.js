import LandingPage from '../src/content/LandingPage/LandingPage';
import Layout from '../src/components/Layout/Layout';
import { Content } from '@carbon/react';

function Home () {
  return (
    <Layout>
      <Content>
      <LandingPage />
      </Content>
    </Layout>
    )
}

export default Home;
