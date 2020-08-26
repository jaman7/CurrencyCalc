import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Form from './Form';
import Span from './html/Span';

@inject('Currencystore')
@observer
class App extends Component {
	async componentDidMount() {
		const { Currencystore } = this.props;
		Currencystore.Retrieve('');
	}

	render() {
		const { Currencystore } = this.props;

		return (
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
								<Span text="=" />
							</div>

							<div className="converterresult-conversionTo">
								<Span
									text={Currencystore.calculate}
									elemClass="converterresult-toAmount"
								/>
								<Span
									text={Currencystore.CurrencyQuery}
									elemClass="converterresult-toCurrency"
								/>
							</div>
						</div>
					</div>
					<div className="col-12 col-amount">
						<div className="info-second">
							<Span text="1" />
							<Span text={Currencystore.CurrencyQueryfrom} />
							<Span text="=" />
							<Span text={Currencystore.conversionRate} />
							<Span text={Currencystore.CurrencyQuery} />
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
