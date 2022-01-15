import React from 'react';
import twitter from '../../assets/desktop/twitter.png';
import discord from '../../assets/desktop/g20.png';
import opensea from '../../assets/desktop/opensea.png';
import footerLogo from '../../assets/desktop/footer-logo.png';

export default function Footer() {
	return (
		<footer>
			<img src={footerLogo} alt="BMC Logo" className="fLogo" />
			<div className="socialMedia">
				<a
					href="https://opensea.io/collection/blockchainminersclubofficial"
					target="_blank"
					rel="noreferrer"
				>
					<img src={opensea} alt="Opensea" />
				</a>
				<a
					href="https://discord.com/invite/blockchainminers"
					target="_blank"
					rel="noreferrer"
				>
					<img src={discord} alt="Discord" />
				</a>

				<a href="https://twitter.com/BMC_NFT" target="_blank" rel="noreferrer">
					<img src={twitter} alt="Twitter" />
				</a>
			</div>
		</footer>
	);
}
