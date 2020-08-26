import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import uuid from 'react-uuid';
// import { toJS } from 'mobx';

@inject('Currencystore')
@observer
class List extends Component {
	async componentDidMount() {
		const { Currencystore } = this.props;
		Currencystore.Retrievelists();
	}

	render() {
		const { list, option } = this.props;

		// console.log(list);

		return (
			<>
				{option ? (
					<option value="" key={uuid()}>
						EUR
					</option>
				) : (
					<option value="" key={uuid()}>
						select Currency
					</option>
				)}

				{list
					.sort((a, b) => (a > b ? 1 : -1))
					.map((item) => (
						<option value={item} key={uuid()}>
							{item}
						</option>
					))}
			</>
		);
	}
}

List.wrappedComponent.propTypes = {
	option: PropTypes.bool.isRequired,
	list: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default List;
