import React from 'react';
import Link from 'next/link';

export default class Card extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {active: false};
  }

  render() {
    const card = this.props.card;
    const cardRow = <div className={'col-lg-4'}>
      <div className={'mx-2 my-2 card'}>
        <div>
          <div className={'my-4 text-center'}>{card.name}</div>
        </div>
        <div>
          <div className={'my-4 text-center'}><img src={card.imageUrl} />
          </div>
        </div>
        <div>
          <div className={'my-4 text-center'}>{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(card.latestPrice)}</div>
        </div>
        <div className={'text-center'}><Link href={'/price?name='+card.name}>
          <button type={'button'} className={'btn btn-secondary my-4'}>
            Show Price History
          </button>
        </Link> </div>
      </div>
    </div>;
    return cardRow;
  }
}
