/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import uuid from 'react-uuid';
// import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';

import List from './List';

@inject('Currencystore')
@observer
class App extends Component {
	async componentDidMount() {
		const { Currencystore } = this.props;
		Currencystore.Retrieve('');
	}

	render() {
		const { Currencystore } = this.props;
		// console.log(toJS(Currencystore.toCurrencyKeys));
		// console.log(toJS(Currencystore.toCurrencyValues));

		return (
			<div className="container bg-form">
				<div className="row">
					<div className="col-12">
						<form className="form-flex">
							<div className="form-group">
								<label htmlFor="amount">Amount</label>
								<input
									className="form-control"
									onChange={(e) => Currencystore.handleAmount(e)}
									type="tel"
									value={Currencystore.amount}
									name="amount"
									id="amount"
									placeholder="Enter amount here..."
								/>
							</div>

							<div className="form-group">
								<label htmlFor="selectfrom">From</label>
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
							</div>

							<img className="img-fluid" src="img/change.svg" alt="change" />

							<div className="form-group">
								<label htmlFor="selectfrom">To</label>
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
							</div>
						</form>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-amount">
						<div className="text-center">
							<div className="converterresult-conversionFrom">
								<span className="fromAmount">{Currencystore.amount} </span>
								<span>{Currencystore.CurrencyQueryfrom}</span> =
							</div>

							<div className="converterresult-conversionTo">
								<span className="converterresult-toAmount">
									{Currencystore.calculate}
								</span>
								<span className="converterresult-toCurrency">
									{Currencystore.CurrencyQuery}
								</span>
							</div>
						</div>
					</div>
					<div className="col-12 col-amount">
						<div className="info-second">
							<span>1</span>
							<span>{Currencystore.CurrencyQueryfrom}</span>
							<span>=</span>
							<span>{Currencystore.conversionRate}</span>
							<span>{Currencystore.CurrencyQuery}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

App.wrappedComponent.propTypes = {
	Currencystore: PropTypes.objectOf(PropTypes.object).isRequired
};

export default App;
