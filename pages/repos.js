import Head from 'next/head';
import React from 'react';
import Layout from '@/src/components/Layout';
import { Content } from '@carbon/react';
import RepoPage from '@/src/content/RepoPage/RepoPage';

function ReposPage() {
  return (
    <Layout>
      <Content>
      <RepoPage />
      </Content>
    </Layout>
  )
};

export default ReposPage;
