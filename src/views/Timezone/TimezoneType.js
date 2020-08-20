import React from 'react';

export const Timezonetype = (props) => {
	const { types } = props;
	return (
		<select
			onChange={props.onSelected}
			id='timezoneType'
			defaultValue={props.timezoneTypeDefault}>
			{types.map((type, ind) => {
				return (
					<option key={ind} value={type}>
						{type}
					</option>
				);
			})}
		</select>
	);
};

export default Timezonetype;
