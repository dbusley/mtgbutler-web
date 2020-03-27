import React from 'react';
import fetch from 'node-fetch';
import Card from './Card';
import Router from 'next/router';
import BounceLoader from 'react-spinners/BounceLoader';
import {Form, FormGroup, Button, ButtonGroup} from 'react-bootstrap';

export default class CardTable extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    var qs = {...this.state.data};
    qs.page = 0;
    this.setState({data: {...qs}});
    delete qs.cards;
    Router.push('/?'+new URLSearchParams(qs));
  };

  setLoading = () => {
    this.setState({loading: true});
  }

  showMenu = () => {
    return this.state.menu ? "show" : "";
  }

  hideMenu = () => {
    return this.state.menu ? "" : "show";
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      data: props.data,
      menu: false
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.data.cards !== this.state.data.cards) {
      this.setState({data: {...this.state.data, cards: this.props.data.cards}, loading: false});
    }
  }

  componentDidMount() {
      this.setState({loading: false});
  }

  render() {
    const cards = this.state.data.cards._embedded.cards
        .map((card) => <Card key={card.name} card={card} setLoading={this.setLoading}/>);
    return (
      <div className={'row'}
        style={this.state.loading ? {opacity: 0.1} : {opacity: 1}}>
          <div className={'col-md-12 text-center'}><BounceLoader
              css={{margin: '0 auto'}}
              loading={this.state.loading}/>
          </div>
        <div className={'col-lg-12 sticky-top collapse '+this.hideMenu()}>
            <button type={'button'} className={'btn btn-primary mb-4'}
              style={{width:'100%'}}
              onClick={() => this.setState({menu: true})}>
              Card Lookup
            </button>
        </div>

        <div className={'col-lg-12 sticky-top collapse '+this.showMenu()}>
          <div className={'mx-2 mb-2 card'}>
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
            <FormGroup controlId={'formColorSearch'}>
              <Form.Label>Color</Form.Label>
              <Form.Control as={'select'} placeholder={'Choose color...'} value={this.state.data.colors}
                onChange={(e) => {
                  this.setState({
                      data: {...this.state.data, colors: [...e.target.selectedOptions].map(o => o.value),}
                  })}}>
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
            <Button variant={'secondary'} onClick={() => this.setState({menu: false})}>
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
                                this.setState({loading: true});
                                var qs = {...this.state.data};
                                delete qs.cards;
                                qs.page = parseInt(qs.page);
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

