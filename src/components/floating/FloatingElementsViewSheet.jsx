import ReactCountryFlag from "react-country-flag"
import NavigationViewHeader from '../navigation/NavigationViewHeader';
export default function FloatingElementsViewSheet({
	showBackToTop,
	scrollToTop,
	handleEdit,
	sheetData,
  }) {
		let lang = localStorage.getItem("lang");
		if(!lang)
			sheetData?.language ? lang = sheetData.language : lang = 'EN';
		lang === 'EN' ? lang = 'US' : lang = lang;
		const returnFlag = () => {
			return (
				<div className="fixed bottom-0 right-0 p-4 py-3 px-3">
				<div className="p-2 bg-base-300 rounded-md border border-base-content">
			  <ReactCountryFlag
				className="emojiFlag"
				countryCode={lang.toUpperCase()}
				style={{
					fontSize: '2em',
					lineHeight: '1em',
				}}
			/>
			</div>
			</div>
			)
		}
	if (showBackToTop) {
	  return (
		<div>
			<div className="fixed bottom-14 right-0 p-4 py-3 px-3">
				<button
				onClick={() =>{
					scrollToTop();
					localStorage.removeItem('ActiveSection');
				}}
				className="bg-base-100 text-base-content font-bold py-2 px-4 rounded-md border border-base"
				>
				<span>
					<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6"
					>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M5 10l7-7m0 0l7 7m-7-7v18"
					/>
					</svg>
				</span>
				</button>
			</div>
			{returnFlag()}
			<div className="fixed top-0 left-0 p-4 bg-base-300 w-full min-h-[4rem]">
			<NavigationViewHeader 
				handleEdit={handleEdit}
				sheetData={sheetData}
				inView={true}
			/>
			</div>
		</div>
	  );
	}
	return(returnFlag());
  
  }