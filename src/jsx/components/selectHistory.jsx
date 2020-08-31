import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import List from './List';

const SelectHistory = inject('Currencystore')(
	observer((props) => {
		const { Currencystore } = props;

		const selectState = Currencystore.prevselecthist === '' ? '' : Currencystore.prevselecthist;

		const historylist = [10, 20, 30, 60, 120, 180, 364];

		return (
			<div className="col-12">
				<form className="form-flex py-3">
					<div className="form-group">
						<label htmlFor="selecthistory" className="label-selecthistory">
							Select chart days of history currencies
							<select
								className="form-control"
								name="selecthistory"
								id="selecthistory"
								type="text"
								pattern="[0-9]*"
								value={selectState}
								onChange={(e) => Currencystore.handleHistoryFrom(e)}
							>
								<List
									option={false}
									list={historylist}
									txtdefault="30 days default"
									txt="days"
								/>
							</select>
						</label>
					</div>
				</form>
			</div>
		);
	})
);

SelectHistory.wrappedComponent.propTypes = {
	Currencystore: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default SelectHistory;
