import React, {useEffect, useState} from 'react';
import fetch from 'node-fetch';
import Card from './Card';
import Router from 'next/router';
import {Form, FormGroup, Button, ButtonGroup} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '../redux/actions';

const CardTable = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loadingReducer.loading);

  const [data, setData] = useState(props.data);
  const [menu, setMenu] = useState(false);

  const determineOpacity = () => {
    return {opacity: loading ? 0.1 : 1};
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const qs = {...data};
    delete qs.cards;
    qs.page = 0;
    const res = await fetch(window.location.protocol + '//' +
      window.location.hostname + (window.location.port === '' ?
        '' : ':' + window.location.port) +
      '/cards?' + new URLSearchParams(qs));
    const searchData = await res.json();
    setData({
      ...data,
      cards: searchData,
      page: qs.page,
    });
  };

  const showMenu = () => {
    return menu ? 'show' : '';
  };

  const hideMenu = () => {
    return menu ? '' : 'show';
  };

  useEffect(() => {
    const cachedPageHeight = [];
    const html = document.querySelector('html');

    Router.events.on('routeChangeStart', () => {
      cachedPageHeight.push(document.documentElement.offsetHeight);
    });

    Router.events.on('routeChangeComplete', () => {
      html.style.height = 'initial';
    });

    Router.beforePopState(() => {
      html.style.height = `${cachedPageHeight.pop()}px`;

      return true;
    });

    dispatch(allActions.loadingActions.doneLoading());
  }, [data]);

  const cards = data.cards._embedded.cards
      .map((card) => <Card key={card.name} card={card} />);

  return (
    <div className={'row'} style={determineOpacity()}>
      <div className={'col-lg-12 sticky-top collapse ' + hideMenu()}>
        <button type={'button'} className={'btn btn-primary mb-4'}
          style={{width: '100%'}}
          onClick={() => setMenu(true)}>
          Card Lookup
        </button>
      </div>

      <div className={'col-lg-12 sticky-top collapse ' + showMenu()}>
        <div className={'mx-2 mb-2 card'}>
          <Form onSubmit={handleSubmit} className={'my-4 mx-4'}>
            <FormGroup controlId={'formCardSearch'}>
              <Form.Label>Card name</Form.Label>
              <Form.Control placeholder={'Card name'} type={'text'}
                autoComplete={'off'}
                value={data.name}
                onChange={(e) => {
                  setData({
                    ...data,
                    name: e.target.value,
                  });
                }
                }/>
            </FormGroup>
            <FormGroup controlId={'formColorSearch'}>
              <Form.Label>Color</Form.Label>
              <Form.Control as={'select'} placeholder={'Choose color...'}
                value={data.colors}
                onChange={(e) => {
                  setData({
                    ...data,
                    colors: [...e.target.selectedOptions].map(o => o.value),
                  });
                }}>
                <option value={''}>Choose color...</option>
                <option value={'W'}>White</option>
                <option value={'U'}>Blue</option>
                <option value={'B'}>Black</option>
                <option value={'R'}>Red</option>
                <option value={'G'}>Green</option>
              </Form.Control>
            </FormGroup>
            <ButtonGroup>
              <Button variant={'primary'} type={'submit'}>
                Search
              </Button>
              <Button variant={'secondary'}
                onClick={() => setMenu(false)}>
                Hide filters
              </Button>
            </ButtonGroup>
          </Form>
        </div>
      </div>
      <div className={'col-lg-12'}>
        <div className={'row'}>
          {cards}
        </div>
        <div className={'col-sm-12 col-md-12 text-center'}>
          <div>
            <button type={'button'} className={'btn btn-secondary my-4'}
              onClick={async () => {
                const qs = {...data};
                delete qs.cards;
                qs.page = parseInt(qs.page);
                qs.page += 1;
                const res = await fetch(window.location.protocol + '//' +
                  window.location.hostname + (window.location.port === '' ?
                            '' : ':' + window.location.port) +
                          '/cards?' + new URLSearchParams(qs));
                const moreData = await res.json();
                const currentCards = moreData;
                currentCards._embedded.cards = data.cards._embedded.cards
                    .concat(currentCards._embedded.cards);
                currentCards._links = moreData._links;
                setData({
                  ...data,
                  cards: currentCards,
                  page: qs.page,
                });
              }}> More
            </button>
          </div>
        </div>
      </div>
    </div>);
};

export default CardTable;
