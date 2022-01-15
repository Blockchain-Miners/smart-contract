import React from 'react';
import { NavLink } from 'react-router-dom';
import burnImg from '../../assets/BURN.png';
import useMediaQuery from '../../hooks/useMediaQuery';

export default function Navigation() {
	const isdesktop = useMediaQuery('(max-width: 600px)');
	return (
		<>
			{isdesktop ? (
				''
			) : (
				<nav>
					<NavLink to="/burn">
						<img src={burnImg} alt="Burn" />
					</NavLink>
				</nav>
			)}
		</>
	);
}
