import Layout from '../components/Layout';
import React from 'react';
import PriceChart from '../components/PriceChart';
import {get} from '../client';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '../redux/reducers';

const store = createStore(rootReducer);

const Price = (props) => <Provider store={store}>
  <Layout>
    <PriceChart card={props.card} prices={props.prices}/>
  </Layout>
</Provider>;

export async function getServerSideProps(context) {
  const data = await get('cards', {name: context.req.query.name});
  const linkData = await get(data._embedded.cards[0]._links.prices.href);
  return {props: {card: data._embedded.cards[0], prices: linkData}};
}

export default Price;
