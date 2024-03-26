export function SortIcon(): JSX.Element {
	return (
		<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<circle id="grid-sort-svg-path-1" cx="8" cy="8" r="8"></circle>
				<filter x="-34.4%" y="-21.9%" width="168.8%" height="168.8%" filterUnits="objectBoundingBox" id="filter-2">
					<feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
					<feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
					<feColorMatrix
						values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.085309222 0"
						type="matrix"
						in="shadowBlurOuter1"></feColorMatrix>
				</filter>
			</defs>
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<use fill-rule="evenodd" xlink:href="#grid-sort-svg-path-1"></use>
				<polygon points="8 4 11 7 5 7"></polygon>
				<polygon points="8 12 5 9 11 9"></polygon>
			</g>
		</svg>
	);
}

export function FilterIcon(): JSX.Element {
	return (
		<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<g>
					<polygon points="10.0085775 7 10.0085775 15 6 13 6 7 2 3 2 1 14 1 14 3"></polygon>
				</g>
			</g>
		</svg>
	);
}

export function ExpandIcon(): JSX.Element {
	return (
		<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<rect x="0.5" y="0.5" width="15" height="15" rx="2"></rect>
				<rect x="4" y="7" width="8" height="2"></rect>
			</g>
		</svg>
	);
}

export function FoldIcon(): JSX.Element {
	return (
		<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<rect x="0.5" y="0.5" width="15" height="15" rx="2"></rect>
				<path d="M8.75,4 L8.75,7.25 L12,7.25 L12,8.75 L8.749,8.75 L8.75,12 L7.25,12 L7.249,8.75 L4,8.75 L4,7.25 L7.25,7.25 L7.25,4 L8.75,4 Z"></path>
			</g>
		</svg>
	);
}