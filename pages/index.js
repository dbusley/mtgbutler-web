import React from 'react';
import {get} from '../client';
import Layout from '../components/Layout';
import App from '../components/App';
import {createStore} from 'redux';
import rootReducer from '../redux/reducers';
import {Provider} from 'react-redux';

const store = createStore(
    rootReducer,
);

const Index = (props) => <Provider store={store}>
  <Layout>
    <App data={props.data} />
  </Layout>
</Provider>;

export async function getServerSideProps(context) {
  const qs = {sort: 'name', page: 0, ...context.req.query};
  const data = await get('cards', qs);
  return {props: {data: {cards: data, ...qs}}};
}

export default Index;
