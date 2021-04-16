import React, { Component } from 'react';
import iconSearch from './../media/icon-search.svg';
import iconSearchSolid from './../media/icon-search-solid.svg';
import './Search.scss';

class Search extends Component {
	render() {
		let icon = iconSearchSolid;

		if (this.props.theme === 'dark')
			icon = iconSearch;

		return (
			<form className={'search search--' + this.props.theme} method="GET">
				<input className="search__input" type="search" name="stq" id="stq" placeholder="Search" />
				<button className="search__button" type="submit">
					<img src={icon} alt="search icon" />
				</button>
			</form>
		);
	}
}

Search.defaultProps = {
	theme: "dark"
};

export default Search;
