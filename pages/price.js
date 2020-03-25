import Layout from '../components/Layout';
import React from 'react';
import PriceChart from '../components/PriceChart';
import fetch from 'node-fetch';
import client from '../client';

const Price = (props) => <Layout><PriceChart prices={props.prices} /></Layout>;

export async function getServerSideProps(context) {
  const data = await client('cards', {name: context.req.query.name});
  const linkRes = await fetch(data._embedded.cards[0]._links.prices.href);
  const linkData = await linkRes.json();
  return {props: {prices: linkData}};
}

export default Price;
