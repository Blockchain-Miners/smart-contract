import React, { useEffect, useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';

import Navigation from '../blockComponent/Navigation';
import Slider from 'infinite-react-carousel';
import { connect } from '../../redux/blockchain/blockchainActions';
import { fetchData } from '../../redux/data/dataActions';
// Redux
import { useDispatch, useSelector } from 'react-redux';

// images
import bmcLogo from '../../assets/bcm-logo.png';
import soldOut from '../../assets/sold-out.png';
import ourMiner from '../../assets/desktop/ourMiner.png';
import earnToken from '../../assets/desktop/earn-token.png';
import hashToken from '../../assets/desktop/hash.png';
import burningGraphic from '../../assets/desktop/burning-graphic.png';
import gem from '../../assets/desktop/gem.png';
import abstract from '../../assets/desktop/abstract.png';
import organic from '../../assets/desktop/organic.png';
import cyber from '../../assets/desktop/cyber.png';

// mobile images
import minerLogo from '../../assets/bm-logo-64.png';
import ourMinerM from '../../assets/mobile/ourMiner.png';
import earnTokenM from '../../assets/mobile/earn-token.png';
import hashTokenM from '../../assets/mobile/hash.png';
import burningGraphicM from '../../assets/mobile/burning-graphic.png';
import gemM from '../../assets/mobile/gem.png';
import abstractM from '../../assets/mobile/abstract.png';
import organicM from '../../assets/mobile/organic.png';
import cyberM from '../../assets/mobile/cyber.png';

//Slider one
import slide1 from '../../assets/desktop/1.png';
import slide2 from '../../assets/desktop/2.png';
import slide3 from '../../assets/desktop/3.png';
import slide4 from '../../assets/desktop/4.png';
import slide5 from '../../assets/desktop/5.png';
import slide6 from '../../assets/desktop/6.png';
import slide7 from '../../assets/desktop/7.png';
import slide8 from '../../assets/desktop/8.png';
import slide9 from '../../assets/desktop/9.png';
import slide10 from '../../assets/desktop/10.png';
import slide11 from '../../assets/desktop/11.png';
import slide12 from '../../assets/desktop/12.png';
//mobile
import slide1M from '../../assets/mobile/1.png';
import slide2M from '../../assets/mobile/2.png';
import slide3M from '../../assets/mobile/3.png';
import slide4M from '../../assets/mobile/4.png';
import slide5M from '../../assets/mobile/5.png';
import slide6M from '../../assets/mobile/6.png';
import slide7M from '../../assets/mobile/7.png';
import slide8M from '../../assets/mobile/8.png';
import slide9M from '../../assets/mobile/9.png';
import slide10M from '../../assets/mobile/10.png';
import slide11M from '../../assets/mobile/11.png';
import slide12M from '../../assets/mobile/12.png';

import Footer from '../blockComponent/Footer';

export default function Home() {
	const btcTotal = '2.06';
	const btcDollar = '$88,705';
	const ethTotal = '44.51';
	const ethDollar = '$146,500';

	const hashDisplay = '9,410';

	const blockchain = useSelector((state) => state.blockchain);
	const dispatch = useDispatch();

	const getData = () => {
		if (blockchain.account !== '' && blockchain.smartContract !== null) {
			dispatch(fetchData(blockchain.account));
		}
	};

	// loading component
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getData();
		setTimeout(() => setLoading(false), 1000);
	}, [blockchain.account]);

	const SimpleSlider = () => (
		<Slider
			autoplay={true}
			duration={7500}
			slidesPerRow={5}
			overScan={7}
			autoplayScroll={1}
			arrows={false}
		>
			<div>
				<img src={slide1} alt="Miner image" />
			</div>
			<div>
				<img src={slide2} alt="Miner image" />
			</div>
			<div>
				<img src={slide3} alt="Miner image" />
			</div>
			<div>
				<img src={slide4} alt="Miner image" />
			</div>
			<div>
				<img src={slide5} alt="Miner image" />
			</div>
			<div>
				<img src={slide6} alt="Miner image" />
			</div>
			<div>
				<img src={slide7} alt="Miner image" />
			</div>
			<div>
				<img src={slide8} alt="Miner image" />
			</div>
			<div>
				<img src={slide9} alt="Miner image" />
			</div>
			<div>
				<img src={slide10} alt="Miner image" />
			</div>
			<div>
				<img src={slide11} alt="Miner image" />
			</div>
			<div>
				<img src={slide12} alt="Miner image" />
			</div>
			<div>
				<img src={slide10} alt="Miner image" />
			</div>
			<div>
				<img src={slide11} alt="Miner image" />
			</div>
			<div>
				<img src={slide12} alt="Miner image" />
			</div>
		</Slider>
	);
	const SimpleSlider2 = () => (
		<Slider
			autoplay={true}
			duration={7000}
			slidesPerRow={5}
			overScan={7}
			autoplayScroll={1}
			arrows={false}
		>
			<div>
				<img src={slide7} alt="Miner image" />
			</div>
			<div>
				<img src={slide8} alt="Miner image" />
			</div>
			<div>
				<img src={slide9} alt="Miner image" />
			</div>
			<div>
				<img src={slide10} alt="Miner image" />
			</div>
			<div>
				<img src={slide11} alt="Miner image" />
			</div>
			<div>
				<img src={slide12} alt="Miner image" />
			</div>
			<div>
				<img src={slide1} alt="Miner image" />
			</div>
			<div>
				<img src={slide2} alt="Miner image" />
			</div>
			<div>
				<img src={slide3} alt="Miner image" />
			</div>
			<div>
				<img src={slide4} alt="Miner image" />
			</div>
			<div>
				<img src={slide5} alt="Miner image" />
			</div>
			<div>
				<img src={slide6} alt="Miner image" />
			</div>
			<div>
				<img src={slide1} alt="Miner image" />
			</div>
			<div>
				<img src={slide2} alt="Miner image" />
			</div>
			<div>
				<img src={slide10} alt="Miner image" />
			</div>
		</Slider>
	);

	// mobile
	const SimpleSliderM = () => (
		<Slider
			autoplay={true}
			duration={7500}
			slidesPerRow={3}
			overScan={7}
			autoplayScroll={1}
			arrows={false}
		>
			<div>
				<img src={slide1M} alt="Miner image" />
			</div>
			<div>
				<img src={slide2M} alt="Miner image" />
			</div>
			<div>
				<img src={slide3M} alt="Miner image" />
			</div>
			<div>
				<img src={slide4M} alt="Miner image" />
			</div>
			<div>
				<img src={slide5M} alt="Miner image" />
			</div>
			<div>
				<img src={slide6M} alt="Miner image" />
			</div>
			<div>
				<img src={slide7M} alt="Miner image" />
			</div>
			<div>
				<img src={slide8M} alt="Miner image" />
			</div>
			<div>
				<img src={slide9M} alt="Miner image" />
			</div>
			<div>
				<img src={slide10M} alt="Miner image" />
			</div>
			<div>
				<img src={slide11M} alt="Miner image" />
			</div>
			<div>
				<img src={slide12M} alt="Miner image" />
			</div>
			<div>
				<img src={slide10M} alt="Miner image" />
			</div>
			<div>
				<img src={slide11M} alt="Miner image" />
			</div>
			<div>
				<img src={slide12M} alt="Miner image" />
			</div>
		</Slider>
	);
	const SimpleSlider2M = () => (
		<Slider
			autoplay={true}
			duration={9000}
			slidesPerRow={3}
			overScan={7}
			autoplayScroll={1}
			arrows={false}
		>
			<div>
				<img src={slide7M} alt="Miner image" />
			</div>
			<div>
				<img src={slide8M} alt="Miner image" />
			</div>
			<div>
				<img src={slide9M} alt="Miner image" />
			</div>
			<div>
				<img src={slide10M} alt="Miner image" />
			</div>
			<div>
				<img src={slide11M} alt="Miner image" />
			</div>
			<div>
				<img src={slide12M} alt="Miner image" />
			</div>
			<div>
				<img src={slide1M} alt="Miner image" />
			</div>
			<div>
				<img src={slide2M} alt="Miner image" />
			</div>
			<div>
				<img src={slide3M} alt="Miner image" />
			</div>
			<div>
				<img src={slide4M} alt="Miner image" />
			</div>
			<div>
				<img src={slide5M} alt="Miner image" />
			</div>
			<div>
				<img src={slide6M} alt="Miner image" />
			</div>
			<div>
				<img src={slide1M} alt="Miner image" />
			</div>
			<div>
				<img src={slide2M} alt="Miner image" />
			</div>
			<div>
				<img src={slide10M} alt="Miner image" />
			</div>
		</Slider>
	);

	const isdesktop = useMediaQuery('(max-width: 600px)');
	return (
		<>
			{loading === false ? (
				<div className="mainContainer homePage" isdesktop={isdesktop}>
					<div className="headerBoxTopM">
						<div className="righBoxTop">
							<img src={minerLogo} alt="BMC Logo" className="bmcLogo" />
							<div className="hashDisplay">
								{/* {blockchain.account === '' ||
							blockchain.smartContract === null ? (
								<div className="connectBox">
									<button
										className="btnConnect"
										onClick={(e) => {
											e.preventDefault();
											dispatch(connect());
											getData();
										}}
									>
										Connect wallet
									</button>
									{blockchain.errorMsg !== '' ? (
										<>
											<h4>{blockchain.errorMsg}</h4>
										</>
									) : null}
								</div>
							) : (
								<h3>$HASH {hashDisplay}</h3>
								)} */}
								<h3>$HASH {hashDisplay}</h3>
								<Navigation />
							</div>
						</div>
					</div>
					<header>
						<div className="headerBoxTop">
							<img src={bmcLogo} alt="BMC Logo" className="bmcLogo" />

							<div className="righBoxTop">
								<Navigation />
								<div className="hashDisplay">
									{/* {blockchain.account === '' ||
							blockchain.smartContract === null ? (
								<div className="connectBox">
									<button
										className="btnConnect"
										onClick={(e) => {
											e.preventDefault();
											dispatch(connect());
											getData();
										}}
									>
										Connect wallet
									</button>
									{blockchain.errorMsg !== '' ? (
										<>
											<h4>{blockchain.errorMsg}</h4>
										</>
									) : null}
								</div>
							) : (
								<h3>$HASH {hashDisplay}</h3>
								)} */}
									<h3>$HASH {hashDisplay}</h3>
								</div>
							</div>
						</div>
						<div className="headerBoxBottom">
							<img src={soldOut} alt="Sold out" />
							<a
								href="https://opensea.io/collection/blockchainminersclubofficial"
								target="_blank"
								rel="noopener noreferrer"
							>
								BUY ON OPENSEA
							</a>
						</div>
					</header>
					<div className="whatsbmc">
						{!isdesktop ? (
							<div className="sliders">{SimpleSlider()}</div>
						) : (
							<div className="sliders">{SimpleSliderM()}</div>
						)}

						<h2>WHAT IS BMC?</h2>
						<p>
							Blockchain Miners NFTs are hand drawn rare and unique artworks.
							Our unique artworks are inspired by Bitcoin miners (Antminer S19j
							ASIC Pro) and will be limited to 11,111 items that are generated
							from 280+ traits and attributes.
						</p>
						{!isdesktop ? (
							<div className="sliders">{SimpleSlider2()}</div>
						) : (
							<div className="sliders">{SimpleSlider2M()}</div>
						)}
					</div>
					<div className="bmcRewards">
						<h2>BMC REWARDS</h2>
						<p>Lifetime Rewards Earned</p>
						<div className="rewardsHalf">
							<img src={ourMiner} alt="Miner" />
							<div className="rewardsContent">
								<div className="blkBar">
									<span>BTC</span>
									<span>{btcTotal}</span>
									<span>{btcDollar}</span>
								</div>
								<div className="blkBar">
									<span>ETH</span>
									<span>{ethTotal}</span>
									<span>{ethDollar}</span>
								</div>
								<p>
									Blockchain Miners Club uses BTC miners to create
									sustainability for our project. Mined Bitcoin from our mines
									gets added to our rewards program fund each month.
								</p>
							</div>
						</div>
					</div>
					<div className="ultraMiners">
						<h2>ULTRA MINERS</h2>
						<p>2x Rewards • 2x Votes • 10 $HASH per day</p>
						<div className="blkBox">
							<p>
								<strong>BURNING</strong> is coming! On January 18th, 2022 you
								will be able to take ANY two OG Blockchain Miners Club NFTs and
								burn those items to mint an ULTRA MINER
							</p>
						</div>
					</div>
					<div className="burningGraphic">
						{!isdesktop ? (
							<img src={burningGraphic} alt="Miners burning graphic" />
						) : (
							<img src={burningGraphicM} alt="Miners burning graphic" />
						)}

						<p>
							Burned NFT’s will be removed from the OG collection supply and
							items will be gone forever! ULTRA’s are made of 280+ never before
							seen traits. ULTRAS are made up from 4 different types.
						</p>
					</div>
					<div className="ultraMinersCat">
						<figure>
							{!isdesktop ? (
								<img src={gem} alt="Ultra Miner" />
							) : (
								<img src={gemM} alt="Ultra Miner" />
							)}
							<figcaption>GEM</figcaption>
						</figure>
						<figure>
							{!isdesktop ? (
								<img src={abstract} alt="Ultra Miner" />
							) : (
								<img src={abstractM} alt="Ultra Miner" />
							)}
							<figcaption>ABSTRACT</figcaption>
						</figure>
						<figure>
							{!isdesktop ? (
								<img src={organic} alt="Ultra Miner" />
							) : (
								<img src={organicM} alt="Ultra Miner" />
							)}
							<figcaption>ORGANIC</figcaption>
						</figure>
						<figure>
							{!isdesktop ? (
								<img src={cyber} alt="Ultra Miner" />
							) : (
								<img src={cyberM} alt="Ultra Miner" />
							)}
							<figcaption>CYBER</figcaption>
						</figure>
					</div>
					<div className="hashToken">
						<h2>$HASH TOKEN</h2>
						<div className="hashBox">
							{!isdesktop ? (
								<img src={hashToken} alt="Coin" />
							) : (
								<img src={hashTokenM} alt="Coin" />
							)}

							<p>
								The first erc20 token to be able to be exchanged for mining
								hashpower! How does it work?
							</p>
						</div>
						{!isdesktop ? (
							<img src={earnToken} alt="Miners" className="earnHash" />
						) : (
							<img src={earnTokenM} alt="Miners" className="earnHash" />
						)}

						<h2>YIELD BTC THROUGH MINING</h2>
						<p>
							<strong>$HASH</strong> token for Hashpower program starts{' '}
							<strong>April 4th, 2022</strong>. BMC VENTURES INC. has dedicated
							1,500,000 GH/s towards this program.
						</p>
					</div>
					<Footer />
				</div>
			) : (
				'Loading...'
			)}
		</>
	);
}
