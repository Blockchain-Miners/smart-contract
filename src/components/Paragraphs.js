export default function Paragraphs({title = '', underline = false, textContent = ['']}) {
	const underlineText = (text) => {
		const [first, ...rest] = text.split('.')
		const body = rest.join('.')
		return [first, body]
	}

	return (
		<>
			{title && (
				<>
					<h1>{title}</h1>
				</>
			)}

			<br />
			{textContent.map((text, index) => {
				let content = text
				if (underline) {
					content = underlineText(text)
				}
				return (
					<div key={index}>
						{underline ? (
							<span>
								<span style={{textDecoration: 'underline'}}>{content[0]}.</span> {content[1]}
							</span>
						) : (
							<span>
								{content}
							</span>
						)}
						<br />
						<br />
					</div>
				)
			})}
			
		</>
	)
}