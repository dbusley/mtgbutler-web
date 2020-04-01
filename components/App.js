import React, {useEffect} from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import CardTable from './CardTable';
import * as Sentry from '@sentry/browser';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../redux/actions';

Sentry.init({
  dsn: 'https://51062c99acf742718df40413e67ec1da@sentry.io/5176937',
});

export default (props) => {
  const loading = useSelector((state) => state.loadingReducer.loading);

  const dispatch = useDispatch();

  const loadingStyle = () => {
    if (loading) {
      return {
        display: 'block',
      };
    } else {
      return {
        display: 'none',
      };
    }
  };

  useEffect(() => {
    dispatch(allActions.loadingActions.doneLoading());
  }, []);

  return (<div>
    <div className={'overlay'} style={loadingStyle()}>
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <BounceLoader
          css={{margin: '0 auto'}}
          loading={loading}/>
      </div>
    </div>
    <CardTable data={props.data}/>
  </div>);
};
