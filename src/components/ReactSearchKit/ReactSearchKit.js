import React, { Component } from 'react';
import { createProvider } from 'react-redux';
import PropTypes from 'prop-types';
import { configureStore, storeKey } from '@app/store';
import { SearchApi as _SearchApi } from '@app/api/SearchApi';
import 'semantic-ui-css/semantic.min.css';
import { UrlParamsProvider } from '@app/components/UrlParamsProvider';
import { UrlParamsApi as _UrlParamsApi } from '@app/api/UrlParamsApi';

const Provider = createProvider(storeKey);

export class ReactSearchKit extends Component {
  constructor(props) {
    super(props);
    const SearchApi = props.searchApi || _SearchApi;
    const UrlParamsApi = props.urlParamsApi || _UrlParamsApi;
    const { urlParamsSerializer, paramValidator } = props;
    const setSortByOnEmptyQuery = props.setSortByOnEmptyQuery;
    let config = {
      apiConfig: props.apiConfig,
      searchApi: new SearchApi(),
      urlParamsApi: new UrlParamsApi(urlParamsSerializer, paramValidator),
      setSortByOnEmptyQuery: setSortByOnEmptyQuery,
    };
    this.store = configureStore(config);
  }

  render() {
    let { searchDefault } = this.props;

    return (
      <Provider store={this.store}>
        <UrlParamsProvider searchDefault={searchDefault}>
          {this.props.children}
        </UrlParamsProvider>
      </Provider>
    );
  }
}

ReactSearchKit.propTypes = {
  searchDefault: PropTypes.bool,
  setSortByOnEmptyQuery: PropTypes.string,
};

ReactSearchKit.defaultProps = {
  searchDefault: false,
  setSortByOnEmptyQuery: null,
};
