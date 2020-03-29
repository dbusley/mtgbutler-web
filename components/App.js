import React, {useState, useEffect} from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import CardTable from './CardTable';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://51062c99acf742718df40413e67ec1da@sentry.io/5176937',
});

export default (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (<div>
    <div className={'overlay'}>
      <div className={'col-md-12 text-center'}><BounceLoader
        css={{margin: '0 auto'}}
        loading={loading}/>
      </div>
    </div>
    <CardTable data={props.data}/>
  </div>);
};
