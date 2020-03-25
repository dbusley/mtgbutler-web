import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import CardTable from "./CardTable";

export default class App extends React.Component {
  /**
     * Constructor of app component
     * @constructor
     * @param {Object} props - properties passed to the component
     * @param {Object} context - */
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  render() {
    return <div>
      <div className={'overlay'}>
        <div className={'col-md-12 text-center'}><BounceLoader
          css={{margin: '0 auto'}}
          loading={this.state.loading}/>
        </div>
      </div>
      <CardTable data={this.props.data}/>
    </div>;
  }
}
