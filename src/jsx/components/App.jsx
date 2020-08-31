import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Line } from 'react-chartjs-2';

import Form from './Form';
import Span from './Span';
import SelectHistory from './selectHistory';

@inject('Currencystore')
@observer
class App extends Component {
	async componentDidMount() {
		const { Currencystore } = this.props;
		Currencystore.Retrieve('');
	}

	render() {
		const { Currencystore } = this.props;

		// const To = Currencystore.CurrencyQuery;
		// Currencystore.Test(To);

		console.log(`query: ${Currencystore.CurrencyQuery}`);

		const flagFrom =
			Currencystore.CurrencyQueryfrom.length > 0
				? `ml-1 currency-flag currency-flag-${Currencystore.CurrencyQueryfrom.toLowerCase()}`
				: '';

		const flagTo =
			Currencystore.CurrencyQuery.length > 0
				? `ml-1 currency-flag currency-flag-${Currencystore.CurrencyQuery.toLowerCase()}`
				: '';

		const queryToToEmpty = Currencystore.CurrencyQuery.length > 0;

		// const historylist = [10, 20, 30, 60, 120, 180, 364];

		return (
			<>
				<div className="container bg-form">
					<div className="row">
						<div className="col-12">
							<Form />
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-amount">
							<div className="text-center">
								<div className="converterresult-conversionFrom">
									<Span text={Currencystore.amount} elemClass="fromAmount" />
									<Span text={Currencystore.CurrencyQueryfrom} />
									<Span elemClass={flagFrom} />
									<Span text="=" />
								</div>

								<div className="converterresult-conversionTo">
									<Span
										text={parseFloat(Currencystore.calculate.toFixed(5))}
										elemClass="converterresult-toAmount"
									/>
									<Span
										text={Currencystore.CurrencyQuery}
										elemClass="converterresult-toCurrency"
									/>
									<Span elemClass={flagTo} />
								</div>
							</div>
						</div>
						<div className="col-12 col-amount">
							<div className="converterresult-conversion__1">
								<Span text="1" />
								<Span text={Currencystore.CurrencyQueryfrom} />
								<Span elemClass={flagFrom} />
								<Span text="=" />
								<Span text={Currencystore.conversionRate} />
								<Span text={Currencystore.CurrencyQuery} />
								<Span elemClass={flagTo} />
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						{queryToToEmpty && (
							<>
								<SelectHistory />

								<div className="col-12 relative">
									<article className="canvas-container">
										<Line
											data={toJS(Currencystore.historyData)}
											options={{
												responsive: true,
												maintainAspectRatio: false,
												animation: {
													duration: 800
												}
											}}
										/>
									</article>
								</div>
							</>
						)}
					</div>
				</div>
			</>
		);
	}
}

App.wrappedComponent.propTypes = {
	Currencystore: PropTypes.objectOf(PropTypes.object).isRequired
};

export default App;
