import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Search from './Search';
import iconBasket from './../media/icon-basket.svg';
import iconUser from './../media/icon-user.svg';
import iconClose from './../media/icon-close.svg';
import Logo from './../media/compassion-logo.svg';
import iconMenu from './../media/icon-menu.svg';
import './Header.scss';
import './UtilityNav.scss';
import './MainNav.scss';
import navJson from './../data/navigation.json';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cartItems: [],
			isNavOpen: false,
			userGlobalId: null,
			userFirstName: null
		};
	}
	
	renderNavItems = () => {
		let markup = [];

		for (let i = 0; i < navJson.length; i++) {
			let item = navJson[i];
			let childMarkup = [];

			for (let j = 0; j < item.categories.length; j++) {
				let category = item.categories[j];
				let childChildMarkup = [];

				for (let k = 0; k < category.children.length; k++) {
					let child = category.children[k];

					childChildMarkup.push(
						<li className="main-nav__item" key={k}>
							<a className="main-nav__link" href={child.link}>{child.title}</a>
						</li>
					);
				}

				childMarkup.push(
					<li className="main-nav__item" key={j}>
						<a className="main-nav__link" href={category.link}>{category.title}</a>
						{ childChildMarkup.length > 0 && 
							<button className="main-nav__child-trigger" onClick={(e) => this.toggleChild(e)}></button>
						}
						{ childChildMarkup.length > 0 &&
							<ul className="main-nav__list main-nav__list--tertiary">
								{childChildMarkup}
							</ul>
						}
					</li>
				);
			}

			markup.push(
				<li className="main-nav__item" key={i}>
					<a className="main-nav__link" href={item.link}>{item.title}</a>
					{ childMarkup.length > 0 && 
						<button className="main-nav__child-trigger" onClick={(e) => this.toggleChild(e)}></button>
					}
					{ childMarkup.length > 0 &&
						<ul className="main-nav__list main-nav__list--secondary">
							{childMarkup}
						</ul>
					}
				</li>
			);
		}

		return markup;
	}

	isLoggedIn = () => {
		return this.state.userGlobalId ? true : false;
	}

	toggleChild = (e) => {
		let button = e.target;
		let parent = button.parentNode;

		if (parent.classList.contains('is-open')) {
			parent.classList.remove('is-open');
		} else {
			parent.classList.add('is-open');
		}
	}

	toggleMenu = () => {
		let app = document.querySelector('.App');

		if (this.state.isNavOpen) {
			this.setState({isNavOpen: false});

			if (app)
				app.classList.remove('nav-is-open');
		} else {
			this.setState({isNavOpen: true});

			if (app)
				app.classList.add('nav-is-open');
		}
	}

	render() {
		let mainNavClassNames = ['main-nav'];

		if (this.state.isNavOpen)
			mainNavClassNames.push('is-open');

		return(
			<header className="header bg-blue-2">
				<Container bsPrefix="container-xl">
					<Row className="align-items-center">
						<Col bsPrefix="col-auto" className="my-2">
							<a href="/">
								<img className="header__logo" src={Logo} alt="Compassion International" />
							</a>
						</Col>
						<Col bsPrefix="col d-flex justify-content-end">
							{this.props.showUtilityNav &&
								<nav className="utility-nav">
									<ul className="utility-nav__list d-flex">
										<li className="utility-nav__item utility-nav__item--checkout">
											<a className="utility-nav__link text-bold text-yellow" href="/checkout/">
												<img className="utility-nav__icon"  src={iconBasket} alt="basket icon" />
												{this.state.cartItems.length}
											</a>
										</li>
										<li className="utility-nav__item d-none d-sm-flex utility-nav__item--account">
											<a className="utility-nav__link text-white" href="/my-account/">
												<img className="utility-nav__icon" src={iconUser} alt="user icon" />
												{this.isLoggedIn() &&
													<span>Hi, {this.state.userFirstName}</span>
												}
												{!this.isLoggedIn() &&
													<span>My Account</span>
												}
											</a>
										</li>
										<li className="utility-nav__item utility-nav__item--search d-none d-md-block mr-0">
											<Search theme="dark" />
										</li>
									</ul>
								</nav>
							}
						</Col>
						{this.props.showNav &&
							<Col bsPrefix="col-auto d-lg-none pl-0">
								<button className="header__hamburger" onClick={this.toggleMenu}>
									<img className="header__open" src={iconMenu} alt="menu icon" />
									<img className="header__close" src={iconClose} onClick={this.toggleMenu} alt="close icon" />
								</button>
							</Col>
							
						}
					</Row>
				</Container>
				{this.props.showNav &&
					<div className="bg-blue">
						<Container bsPrefix="container-xl">
							<nav className={mainNavClassNames.join(' ')}>
								<div className="main-nav__search d-md-none">
									<Search theme="light" />
								</div>
								<ul className="main-nav__list main-nav__list--primary">
									{this.renderNavItems()}
								</ul>
							</nav>
						</Container>
					</div>
				}
			</header>
		);
	}
}

Header.defaultProps = {
	showNav: true,
	showUtilityNav: true
};

export default Header;
