import React from 'react';
import Link from 'next/link';

export default (props) => {
  const card = props.card;
  const cardRow = <div className={'col-lg-4 col-md-6 col-sm-12'}>
    <div className={'mx-2 mb-2 card'}>
      <div>
        <div className={'my-4 text-center'}>{card.name}</div>
      </div>
      <div>
        <div className={'my-4 text-center'}><img src={card.imageUrl}/>
        </div>
      </div>
      <div>
        <div className={'my-4 text-center'}>{new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(card.latestPrice)}</div>
      </div>
      <div className={'text-center'}><Link href={'/price?name=' + card.name}>
        <button type={'button'} className={'btn btn-secondary my-4'}
          onClick={props.setLoading}>
          Show Price History
        </button>
      </Link></div>
    </div>
  </div>;
  return cardRow;
};
