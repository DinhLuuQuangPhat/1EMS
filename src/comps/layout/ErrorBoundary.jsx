import React from "react";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {hasError: false, error: ""};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true, error: error}
  }

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({hasError: true, error: error})
  }

  render() {
    if (this.state.hasError) {
      return <div>Oops, something went wrong! {JSON.stringify(this.state.error)}</div>
    }

    return this.props.children;
  }

}

export default ErrorBoundary;