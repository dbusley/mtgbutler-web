import React from 'react';
import {CartesianGrid, Line, LineChart,
  Tooltip, XAxis, YAxis, ResponsiveContainer} from 'recharts';

export default class PriceChart extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      prices: props.prices,
    };
  }

  render() {
    const prices = this.state.prices._embedded.prices
        .sort((price, otherPrice) =>
          new Date(price.reportedDate) - new Date(otherPrice.reportedDate));
    return <div className={'row justify-content-md-center'}>
      <ResponsiveContainer height={300} width="80%">
        <LineChart
          data={prices}
          height={300}
          width={800}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="reportedDate" tickFormatter={formatDate}/>
          <YAxis/>
          <Tooltip labelFormatter={formatDate} formatter={formatCurrency}/>
          <Line type="monotone" dataKey="value" stroke="#8884d8"
            activeDot={{r: 8}}/>
        </LineChart>
      </ResponsiveContainer>
    </div>;
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US');
}

function formatCurrency(currencyString) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currencyString);
}
