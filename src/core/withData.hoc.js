import React, {Component} from 'react';

// This is a Higher Order Component.
// DataComponent(WrappedComponent, { method, properties })
export default function withData(WrappedComponent, {fetchDataFunction, properties}) {
  return class extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        data: null
      };

      this.handlePartialData = this.handlePartialData.bind(this);
      this.handleCompleteData = this.handleCompleteData.bind(this);
      this.handleErrorData = this.handleErrorData.bind(this);  
    }

    handlePartialData(partialData) {
      this.setState({
        data: partialData
      });
    }
    handleCompleteData(completeData) {
      if (properties.uuid !== completeData.uuid) {
        this.props.handleUUIDChange(completeData.uuid);
      }
      this.setState({
        data: completeData
      });
    }
    handleErrorData(error) {
      // TODO: Handle Errors better!
    }

    componentWillMount() {
      fetchDataFunction(properties, {
        partial: this.handlePartialData,
        complete: this.handleCompleteData,
        error: this.handleErrorData  
      });
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  }
}