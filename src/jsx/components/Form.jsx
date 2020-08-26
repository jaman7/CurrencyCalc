import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import List from './List';

const Form = inject('Currencystore')(
	observer((props) => {
		const { Currencystore } = props;
		return (
			<form className="form-flex">
				<div className="form-group">
					<label htmlFor="amount">
						Amount
						<input
							className="form-control"
							onChange={(e) => Currencystore.handleAmount(e)}
							type="tel"
							value={Currencystore.amount}
							name="amount"
							id="amount"
							placeholder="Enter amount here..."
							pattern="^-?[0-9]\d*\.?\d*$"
							autoComplete="off"
						/>
					</label>
				</div>

				<div className="form-group">
					<label htmlFor="selectfrom">
						From
						<select
							className="form-control"
							name="selectfrom"
							id="selectfrom"
							type="text"
							pattern="[0-9]*"
							onChange={(e) => Currencystore.handleFrom(e)}
						>
							<List option list={Currencystore.list} />
						</select>
					</label>
				</div>

				<img className="img-fluid" src="img/change.svg" alt="change" />

				<div className="form-group">
					<label htmlFor="selectfrom">
						To
						<select
							className="form-control"
							name="selectto"
							id="selectto"
							type="text"
							pattern="[0-9]*"
							onChange={(e) => Currencystore.handleTo(e)}
						>
							<List option={false} list={Currencystore.toCurrencyKeys} />
						</select>
					</label>
				</div>
			</form>
		);
	})
);

Form.wrappedComponent.propTypes = {
	Currencystore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default Form;
