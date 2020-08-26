import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

const Span = inject('Currencystore')(
	observer((props) => {
		const { text, elemClass } = props;

		return <span className={elemClass}>{text}</span>;
	})
);

Span.wrappedComponent.propTypes = {
	elemClass: PropTypes.string,
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Span.wrappedComponent.defaultProps = {
	elemClass: '',
	text: ''
};

export default Span;
