import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import './App.scss';
import { connect } from './redux/blockchain/blockchainActions';
import { fetchData } from './redux/data/dataActions';
import { fetchMint } from './redux/mint/mintActions';
import logo from './assets/bm-logo-64.png';
import twitter from './assets/twitter-icon.png';
import discord from './assets/discord.png';
import extraIcon from './assets/icon-.png';
import twitterWhite from './assets/twitter.png';
import discordWhite from './assets/discord-white.png';
import opensea from './assets/open-sea.png';
import borderBottom from './assets/up-top-image.svg';
import borderBottomT from './assets/up-top-image2.svg';
import greenMiner from './assets/GreenMiner.png';

function App() {
	const dispatch = useDispatch();
	const blockchain = useSelector((state) => state.blockchain);
	const data = useSelector((state) => state.data);
	const dataT = useSelector((state) => state?.mint);
	const [claimingNft, setClaimingNft] = useState(false);
	const [feedback, setFeedback] = useState(`Public Mint`);
	const [mintAmount, setMintAmount] = useState(1);
	const [CONFIG, SET_CONFIG] = useState({
		CONTRACT_ADDRESS: '',
		SCAN_LINK: '',
		NETWORK: {
			NAME: '',
			SYMBOL: '',
			ID: 0,
		},
		NFT_NAME: '',
		SYMBOL: '',
		MAX_SUPPLY: 1,
		WEI_COST: 0,
		DISPLAY_COST: 0,
		GAS_LIMIT: 0,
		MARKETPLACE: '',
		MARKETPLACE_LINK: '',
		SHOW_BACKGROUND: false,
	});

	const claimNFTs = async () => {
		let cost = CONFIG.WEI_COST;
		let gasLimit = CONFIG.GAS_LIMIT;
		let totalCostWei = String(cost * mintAmount);
		let totalGasLimited = await blockchain.smartContract.methods
			.mint(mintAmount)
			.estimateGas({ from: blockchain.account, value: totalCostWei });
		let totalGasLimit = Math.floor(parseInt(totalGasLimited * 1.3));
		// console.log('Cost: ', totalCostWei);
		// console.log('Gas limit: ', totalGasLimit);
		setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
		setClaimingNft(true);
		blockchain.smartContract.methods.mint(mintAmount);
		blockchain.smartContract.methods
			.mint(mintAmount)
			.send({
				gasLimit: String(totalGasLimit),
				to: CONFIG.CONTRACT_ADDRESS,
				from: blockchain.account,
				value: totalCostWei,
			})
			.once('error', (err) => {
				console.log(err);
				setFeedback('Error minting please contact admin.');
				setClaimingNft(false);
			})
			.then((receipt) => {
				console.log(receipt);
				setFeedback(
					`WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
				);
				setClaimingNft(false);
				dispatch(fetchData(blockchain.account));
			});
	};

	const decrementMintAmount = () => {
		let newMintAmount = mintAmount - 1;
		if (newMintAmount < 1) {
			newMintAmount = 1;
		}
		setMintAmount(newMintAmount);
	};

	const incrementMintAmount = () => {
		let newMintAmount = mintAmount + 1;
		if (newMintAmount > 8) {
			newMintAmount = 8;
		}
		setMintAmount(newMintAmount);
	};

	const getConfig = async () => {
		const configResponse = await fetch('/config/config.json', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		const config = await configResponse.json();
		SET_CONFIG(config);
	};

	const getData = () => {
		if (blockchain.account !== '' && blockchain.smartContract !== null) {
			dispatch(fetchData(blockchain.account));
		}
	};

	const getMint = () => {
		if (blockchain.account !== '' && blockchain.smartContract !== null) {
			dispatch(fetchMint(blockchain.account));
		}
	};

	useEffect(() => {
		getConfig();
	}, []);

	useEffect(() => {
		getData();
	}, [blockchain.account]);

	useEffect(() => {
		getMint();
	}, [blockchain.account]);

	console.log('data', blockchain.account);

	const imgTest =
		'ipfs://d4e9ccb508586d0526e19e42abdede261ca79205312220bcece4f2d7c9e2725f';

	return (
		<>
			<div className="homePage">
				<div className="iconsBox">
					<div className="logo">
						<img src={logo} alt="Logo" />
						<h1>BLOCKCHAIN MINERS</h1>
					</div>
					<div className="socialMedia">
						<a
							href="https://twitter.com/BMC_NFT"
							target="_blank"
							rel="noreferrer"
						>
							{' '}
							<img src={twitter} alt="Logo" />
						</a>
						<a
							href="https://discord.com/invite/blockchainminers"
							target="_blank"
							rel="noreferrer"
						>
							{' '}
							<img src={discord} alt="Logo" />
						</a>
						<a
							href="https://opensea.io/collection/blockchainminersclubofficial"
							target="_blank"
							rel="noreferrer"
						>
							{' '}
							<img src={extraIcon} alt="Logo" />
							<image src={imgTest} alt="test" />
						</a>
					</div>
				</div>

				<div className="wrapperCont">
					<div>
						<p>
							{/* <StyledLink target={'_blank'} href={CONFIG.SCAN_LINK}>
							{truncate(CONFIG.CONTRACT_ADDRESS, 15)}
						</StyledLink> */}
						</p>
						<div className="blueMiner">
							<img src={greenMiner} alt="Green Miner" />
						</div>

						{Number(data?.totalSupply) >= CONFIG.MAX_SUPPLY ? (
							<>
								<p>The sale has ended.</p>
								<p>You can still find {CONFIG.NFT_NAME} on</p>

								<a
									target="_blank"
									rel="noreferrer"
									href={CONFIG.MARKETPLACE_LINK}
								>
									{CONFIG.MARKETPLACE}
								</a>
							</>
						) : (
							<>
								{blockchain.account === '' ||
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
									<div className="mintBox">
										<h3>{feedback}</h3>
										{data?.totalSupply === data?.totalSupply ? (
											<>
												{' '}
												<div>
													<h2 className="totalSupply">
														<NumberFormat
															value={data?.totalSupply}
															displayType={'text'}
															thousandSeparator={true}
														/>
														/
														<NumberFormat
															value={11111}
															displayType={'text'}
															thousandSeparator={true}
														/>
													</h2>
													<div className="quantityBtns">
														<a
															style={{ lineHeight: 0.4 }}
															disabled={claimingNft ? 1 : 0}
															onClick={(e) => {
																e.preventDefault();
																decrementMintAmount();
															}}
															className="quantityBtnMin"
														>
															-
														</a>

														<p className="amount">{mintAmount}</p>

														<a
															disabled={claimingNft ? 1 : 0}
															onClick={(e) => {
																e.preventDefault();
																incrementMintAmount();
															}}
															className="quantityBtn"
														>
															+
														</a>
													</div>
												</div>
												<>
													<h5>
														{(CONFIG.DISPLAY_COST * mintAmount).toFixed(2)}{' '}
														{CONFIG.NETWORK.SYMBOL} + GAS
													</h5>
													<button
														disabled={claimingNft ? 8 : 0}
														onClick={(e) => {
															e.preventDefault();
															claimNFTs();
															getData();
														}}
														className="btnMint"
													>
														{claimingNft ? 'BUSY' : 'Mint'}
													</button>
												</>{' '}
											</>
										) : (
											<h2 className="soldOut">Sold Out!!</h2>
										)}
									</div>
								)}
							</>
						)}
					</div>
				</div>

				<img src={borderBottom} alt="border" className="yellowDivisor" />
				<img src={borderBottomT} alt="border" className="yellowDivisor2" />
			</div>
			<div className="socialMediaBottom">
				<a href="https://twitter.com/BMC_NFT" target="_blank" rel="noreferrer">
					{' '}
					<img src={twitterWhite} alt="Logo" />
				</a>
				<a
					href="https://discord.com/invite/blockchainminers"
					target="_blank"
					rel="noreferrer"
				>
					{' '}
					<img src={discordWhite} alt="Logo" />
				</a>
				<a
					href="https://opensea.io/collection/blockchainminersclubofficial"
					target="_blank"
					rel="noreferrer"
				>
					{' '}
					<img src={opensea} alt="Logo" />
				</a>
			</div>
		</>
	);
}

export default App;
