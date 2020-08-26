/* eslint-disable no-unused-vars */
import React from 'react';
import { toJS, computed, observable, action, configure, runInAction } from 'mobx';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.exchangeratesapi.io';
axios.defaults.responseType = 'json';

configure({
	enforceActions: 'observed'
});

class Currencystore {
	@observable list = [];

	@observable toCurrencyKeys = [];

	@observable toCurrencyValues = [];

	@observable amount = '';

	@observable conversionRate = 0;

	@observable CurrencyQueryfrom = 'EUR';

	@observable CurrencyQuery = '';

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
		console.log(`from: ${query}`);
		return null;
	};

	@action handleTo = (e) => {
		e.preventDefault();
		const query = e.target.value;
		this.CurrencyQuery = query;
		const data = this.toCurrencyKeys.findIndex((item) => item === query);
		this.conversionRate = this.toCurrencyValues[data];
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

	@computed get calculate() {
		return this.amount * this.conversionRate;
	}
}

const store = new Currencystore();

export default store;
