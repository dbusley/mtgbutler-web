import React from 'react';
import fetch from 'node-fetch';
import Card from './Card';
import Router from 'next/router';
import {Form, FormGroup, Button} from 'react-bootstrap';

export default class CardTable extends React.Component {

  handleSubmit = (e) => {
      e.preventDefault();
      var qs = {...this.state.data};
      qs.page = 0;
      delete qs.cards;
      Router.push('/?'+new URLSearchParams(qs));
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      data: props.data,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.data.cards !== this.state.data.cards) {
      this.setState({data: {...this.state.data, cards: this.props.data.cards}});
    }
  }

  render() {
    const cards = this.state.data.cards._embedded.cards
        .map((card) => <Card key={card.name} card={card}/>);
    return (
      <div className={'row'}
        style={this.state.loading ? {opacity: 0.1} : {opacity: 1}}>
        <div className={'col-lg-3 sticky-top'} style={{height: '0px'}}>
          <div className={'mx-2 my-2 card'}>
          <Form onSubmit={this.handleSubmit} className={'my-4 mx-4'}>
            <FormGroup controlId={'formCardSearch'}>
              <Form.Label>Card name</Form.Label>
              <Form.Control placeholder={'Card name'} type={'text'}
                autoComplete={'off'}
                value={this.state.data.name}
                onChange={(e) =>
                  this.setState({
                    data: {...this.state.data, name: e.target.value,}
                  })}/>
            </FormGroup>
            <FormGroup controlId={'formCardSearch'}>
              <Form.Label>Color</Form.Label>
              <Form.Control as={'select'}
                onChange={(e) => {
                  this.setState({
                      data: {...this.state.data, colors: [...e.target.selectedOptions].map(o => o.value),}
                  })}}>
                <option value={'W'}>White</option>
                <option value={'U'}>Blue</option>
                <option value={'B'}>Black</option>
                <option value={'R'}>Red</option>
                <option value={'G'}>Green</option>
              </Form.Control>
              </FormGroup>
            <Button variant={'primary'} type={'submit'}>
                Search
            </Button>
          </Form>
          </div>
        </div>
        <div className={'col-lg-9'}>
          <div className={'row'}>
            {cards}
          </div>
            <div className={'col-sm-12 col-md-12 text-center'}>
                <div>
                    <button type={'button'} className={'btn btn-secondary my-4'}
                            onClick={async () => {
                                var qs = {...this.state.data};
                                delete qs.cards;
                                qs.page += 1;
                                const res =
                                    await fetch(window.location.protocol+ '//'+
                                        window.location.hostname+ (window.location.port === '' ?
                                            '' : ':'+window.location.port)+
                                        '/cards?'+ new URLSearchParams(qs));
                                const data = await res.json();
                                const currentCards = {...this.state.data.cards};
                                currentCards._embedded.cards = currentCards._embedded.cards
                                    .concat(data._embedded.cards);
                                currentCards._links = data._links;
                                this.setState({data: {...this.state.data, cards: currentCards, page:qs.page}});
                            }}> More
                    </button>
                </div>
            </div>
        </div>
      </div>);
  }
}

