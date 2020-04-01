import React from 'react';
import {
  CartesianGrid, Line, LineChart,
  Tooltip, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';

const PriceChart = (props) => {
  const formatDate = (dateString) => moment(dateString, 'YYYY-MM-DD')
      .toDate().toLocaleDateString('en-US');

  const formatCurrency = (currencyString) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(currencyString);

  const priceSorted = props.prices._embedded.prices
      .sort((price, otherPrice) =>
        moment(price.reportedDate, 'YYYY-MM-DD').toDate() -
      moment(otherPrice.reportedDate, 'YYYY-MM-DD').toDate());
  return <div className={'row justify-content-md-center'}>
    <div className={'col-lg-12 text-center mb-4'}>
      <h1>{props.card.name}</h1>
    </div>
    <div className={'col-lg-12 text-center mx-4 mb-4'}>
      <img className={'mx-4'} src={props.card.imageUrl} />
    </div>
    <div className={'col-lg-6 mb-4'}>
      <ResponsiveContainer height={300} width="100%" className={'card'}>
        <LineChart
          margin={{
            top: 5, right: 30, left: 30, bottom: 5,
          }}
          data={priceSorted}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="reportedDate" tickFormatter={formatDate}/>
          <YAxis/>
          <Tooltip labelFormatter={formatDate} formatter={formatCurrency}/>
          <Line type="monotone" dataKey="value" stroke="#8884d8"
            activeDot={{r: 8}}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>;
};

export default PriceChart;
