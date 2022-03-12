import { Link } from 'react-router-dom';
import bmcLogo from '../../assets/bcm-logo.png';
import {
	communityRewardsProgramA,
	communityRewardsProgramB,
	disclaimerText,
	disputesInfoA,
	disputesInfoB,
	disputeTime10DaysText,
	disputeTime30DaysText,
	eligibilityText,
	hashText,
	lawAndSeverability,
	moreTermsAndConditionsText,
	noteDecentralizedNature,
	ownershipText,
	privacyAndDisputes,
	termsAndConditionsText
} from '../../constants/TermsOfServiceText';
import '../../scss/_termsOfService.scss';
import OrderedLists from '../OrderedLists';
import Paragraphs from '../Paragraphs';

export default function TermsOfService() {
	return (
		<div id="tos">
			<header>
				<div className="header">
					<Link to='/'>
						<img src={bmcLogo} alt='BMC Logo' className="bmc-logo" />
					</Link>
					<nav style={{ maxWidth: '100px' }}>
						<Link to='/claim'>
							<h3 className="claim-text">Claim</h3>
						</Link>
					</nav>
				</div>
        </header>
		  <div className="text-container">
			  	<Paragraphs title="Terms & Conditions" textContent={termsAndConditionsText}/>

				<OrderedLists title="Ownership" type='1' listItems={ownershipText} />
				<OrderedLists type='a' indent={1} listItems={communityRewardsProgramA} />
				<OrderedLists type='i' indent={2} listItems={eligibilityText} />
				<OrderedLists type='a' indent={1} start='2' listItems={communityRewardsProgramB} />
				<OrderedLists type='i' indent={2} listItems={hashText} />

				<Paragraphs underline textContent={moreTermsAndConditionsText}/>
				<Paragraphs textContent={noteDecentralizedNature}/>

				<OrderedLists title={"DISCLAIMER"} listItems={disclaimerText} />

				<Paragraphs underline textContent={privacyAndDisputes}/>
				<OrderedLists type="a" indent={1} listItems={disputesInfoA} />
				<OrderedLists type="i" indent={2} listItems={disputeTime10DaysText} />
				<OrderedLists type="a" start={4} indent={1} listItems={disputesInfoB} />
				<OrderedLists type="i" indent={2} listItems={disputeTime30DaysText} />

				<Paragraphs underline textContent={lawAndSeverability}/>
		  </div>
		</div>
	)
}
