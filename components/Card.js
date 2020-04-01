import React from 'react';
import Link from 'next/link';
import {Button, ButtonGroup} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import allActions from '../redux/actions';

export default (props) => {
  const dispatch = useDispatch();

  const card = props.card;
  const cardRow = <div className={'col-lg-3 col-md-6 col-sm-12'}>
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
      <div className={'text-center mb-4'}>
        <Link href={'/price?name=' + card.name}>
          <ButtonGroup>
            <Button variant={'secondary'} onClick={() => {
              dispatch(allActions.loadingActions.loading());
            }}>
              Show Price History
            </Button>
          </ButtonGroup>
        </Link>
      </div>
    </div>
  </div>;
  return cardRow;
};
