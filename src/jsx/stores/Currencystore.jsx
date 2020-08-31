/* eslint-disable no-unused-vars */
import React from 'react';
import { toJS, computed, observable, action, configure, runInAction } from 'mobx';
import axios from 'axios';
import { CURRENCIES } from './exports';

axios.defaults.baseURL = 'https://api.exchangeratesapi.io';
axios.defaults.responseType = 'json';

configure({
	enforceActions: 'observed'
});

class Currencystore {
	@observable historyData = {};

	@observable list = [];

	@observable toCurrencyKeys = [];

	@observable toCurrencyValues = [];

	@observable amount = '';

	@observable conversionRate = 0;

	@observable CurrencyQueryfrom = 'EUR';

	@observable CurrencyQuery = '';

	@observable prevselecthist = 0;

	@observable isloading = true;

	@observable message = '';

	@observable errors = false;

	@action findIndex = (currentid) => {
		return this.heros.findIndex((item) => item.id === currentid);
	};

	@action checkErrAndTextLen = (err, text) => {
		if ((text && text.trim().length) || err) {
			return true;
		}
		return false;
	};

	@action checkIfNull = (item) => {
		if (Number.isNaN(item)) {
			return true;
		}
		return false;
	};

	@action async Retrieve(query = '') {
		try {
			this.rating = [];
			this.isloading = true;
			const response = await axios.get(`/latest?base=${query}`);
			const getRating = response.data;

			runInAction(() => {
				if (response.status === 200) {
					this.message = '';
					this.errors = false;
					this.toCurrencyKeys = Object.keys(getRating.rates);
					this.toCurrencyValues = Object.values(getRating.rates);
				}
				this.isloading = false;
			});
		} catch (error) {
			console.log('err');
		}
	}

	@action async Retrievechart(To = '', count = 30) {
		try {
			this.isloading = true;
			this.historyData = {};
			const todayFormat = new Date().toISOString().slice(0, 10);
			const today = new Date();

			const date30DayFormat = new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate() - count
			)
				.toISOString()
				.slice(0, 10);

			const from = this.CurrencyQueryfrom;
			let fromQ = '';
			if (from === 'EUR') {
				fromQ = '';
			} else {
				fromQ = from;
			}

			const to = this.CurrencyQuery.length === 0 ? To : this.CurrencyQuery;

			const response = await axios.get(
				`/history?start_at=${date30DayFormat}&end_at=${todayFormat}&base=${fromQ}`
			);

			const { rates } = response.data;

			runInAction(() => {
				if (response.status === 200) {
					this.historyData = {
						labels: Object.keys(rates).sort(),
						datasets: [
							{
								data: Object.keys(rates)
									.sort()
									.map((key) => rates[key][to]),
								label: `${from} to ${to}`,
								fill: true,
								backgroundColor: 'rgba(75,192,192,0.2)',
								borderColor: 'rgba(0, 34, 114, 0.65)'
							}
						]
					};
				}
				this.isloading = false;
			});
		} catch (error) {
			console.log('err');
		}
	}

	@action async Retrievelists() {
		try {
			this.isloading = true;
			const response = await axios.get('/latest?base=');
			const getRating = response.data;
			runInAction(() => {
				if (response.status === 200) {
					this.message = '';
					this.errors = false;
					this.list = Object.keys(getRating.rates);
					this.toCurrencyKeys = Object.keys(getRating.rates);
					this.toCurrencyValues = Object.values(getRating.rates);
				}
				this.isloading = false;
			});
		} catch (error) {
			console.log('err');
		}
	}

	@action handleFrom = (e) => {
		e.preventDefault();
		const query = e.target.value;
		this.CurrencyQueryfrom = query || 'EUR';
		this.Retrieve(query);
		if (this.CurrencyQuery.length > 0) {
			this.CurrencyQuery = '';
			this.prevselecthist = '';
		}
		return null;
	};

	@action handleTo = (e) => {
		e.preventDefault();
		const query = e.target.value;
		this.CurrencyQuery = query;
		const data = this.toCurrencyKeys.findIndex((item) => item === query);
		this.conversionRate = this.toCurrencyValues[data];
		this.Retrievechart(query);
		return null;
	};

	@action handleAmount = (e) => {
		e.preventDefault();
		const val = e.target.value;
		if (e.target.validity.valid) {
			this.amount = e.target.value;
		} else if (val === '' || val === '-') {
			this.amount = null;
		}
	};

	@action handleHistoryFrom = (e) => {
		e.preventDefault();
		const value = parseInt(e.target.value, 10);
		const val = this.checkIfNull(value) ? 30 : value;
		this.prevselecthist = val;
		this.Retrievechart('', val);
		return null;
	};

	@computed get calculate() {
		return this.amount * this.conversionRate;
	}
}

const store = new Currencystore();

export default store;
