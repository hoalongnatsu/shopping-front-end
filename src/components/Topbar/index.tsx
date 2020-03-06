import './index.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Components */
import Logo from 'components/Logo';
import ProductSearch from 'components/ProductSearch';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import MenuMobile from './MenuMobile';

/* Interface */
import { RootState, CategoryState } from 'interface';

/* Actions */
import { get_all_categories } from 'actions/categories'

interface ComponentProps {
  
}

interface StateToProps {
  categories: CategoryState[],
}

interface DispatchProps {
  get_all_categories: () => void,
}

type Props = ComponentProps & StateToProps & DispatchProps;

interface State {
  showSearch: boolean,
  showMobileMenu: boolean
}

class Topbar extends Component<Props, State> {
  state = {
    showSearch: false,
    showMobileMenu: false
  }

  componentDidMount = () => {
    const { categories, get_all_categories } = this.props;

    if (categories.length === 0) {
      get_all_categories();
    }
  }

  toggleSearchInput = () => {
    const { showSearch } = this.state;
    this.setState({showSearch: !showSearch});
  }

  showMobileMenu = () => {
    this.setState({showMobileMenu: true});
  }

  closeMobileMenu = () => {
    this.setState({showMobileMenu: false});
  }

  render() {
    const { categories } = this.props;
    const { showSearch, showMobileMenu } = this.state;

    return (
      <div className="topbar">
        <div className="topbar__container">
          <Link className="topbar__logo" to="/">
            <Logo />
          </Link>
          <div className="topbar__content">
            <LeftMenu categories={categories} />
            <RightMenu
              showSearch={showSearch}
              toggleSearchInput={this.toggleSearchInput}
              showMobileMenu={this.showMobileMenu}
            />
          </div>
        </div>
        <MenuMobile
          closeMobileMenu={this.closeMobileMenu}
          visible={showMobileMenu}
          categories={categories}
        />
        {showSearch && <ProductSearch />}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { categories } = state;

  return {
    categories,
  }
}

export default connect(mapStateToProps, { get_all_categories })(Topbar);
