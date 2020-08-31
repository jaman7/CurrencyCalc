import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import uuid from 'react-uuid';

@inject('Currencystore')
@observer
class List extends Component {
	async componentDidMount() {
		const { Currencystore } = this.props;
		Currencystore.Retrievelists();
	}

	render() {
		const { list, option, txtdefault, txt } = this.props;

		return (
			<>
				<option value="" key={uuid()}>
					{txtdefault}
				</option>

				{list
					.sort((a, b) => (a > b ? 1 : -1))
					.map((item) => (
						<option value={item} key={uuid()}>
							{item} {txt}
						</option>
					))}
			</>
		);
	}
}

List.wrappedComponent.propTypes = {
	txt: PropTypes.string,
	txtdefault: PropTypes.string,
	option: PropTypes.bool.isRequired,
	list: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

List.wrappedComponent.defaultProps = {
	txtdefault: '',
	txt: ''
};

export default List;
