export default function FloatingElementsEditSheet({
	showBackToTop,
	scrollToTop,
	handleEdit,
	sheetData,
	handleImportData
  }) {
	if (!showBackToTop) return null;
  
	return (
	  <div>
		<div className="fixed bottom-0 right-0 p-4">
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
		
		<div className="fixed top-0 left-0 p-4 bg-base-300 w-full min-h-[4rem]">
			<div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-3 gap-2 sm:gap-4 items-center w-full">

				<div className="flex justify-start">
					<a href="./">
					<button className="flex items-center bg-base-100 text-base-content p-2 sm:p-3 rounded-md transition border border-base">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>
				</a>
				</div>
				<h1 className="text-xl sm:text-2xl font-bold text-center truncate px-1">
					{sheetData.project_title}
				</h1>
				<div className="flex justify-end">
					<button
						onClick={handleEdit}
						className="w-16 sm:w-20 font-bold bg-blue-600 hover:bg-blue-800 text-white py-2 sm:py-3 px-3 sm:px-6 rounded-md transition text-sm sm:text-base"
					>
						VIEW
					</button>
				</div>
			</div>
		</div>
	  </div>
	);
  }