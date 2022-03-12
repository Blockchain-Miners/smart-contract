export default function OrderedLists({title ='', type = '1', start = '1', indent = 0, listItems = [''], children}) {
	const getIndentMargin = () => {
		switch(indent) {
			case 1:
				return '3em'
			case 2:
				return '7em'
			default:
				return '0'
		}
	}

	return (
		<div>
			<h1>{title}</h1>
			<br/>
			<ol style={{marginLeft: getIndentMargin()}} type={type} start={start}>
				{listItems.map(item => {
					return (
						<>
							<li>
								{item}
							</li>
							<br />
						</>
					)
				})}
			</ol>
		</div>
	)
}