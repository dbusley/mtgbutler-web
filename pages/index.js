import React from 'react';
import client from '../client';
import Layout from '../components/Layout';
import App from '../components/App';

const Index = (props) => <Layout><App data={props.data} /></Layout>;

export async function getServerSideProps(context) {
  const qs = {sort: 'name', page: 0, ...context.req.query};
  const data = await client('cards', qs);
  return {props: {data: {cards: data, ...qs}}};
}

export default Index;
