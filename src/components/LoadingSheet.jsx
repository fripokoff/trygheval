export default function LoadingSheet() {
	return (
	  <div className="bg-gray-100 text-gray-900 min-h-screen">
		<div className="max-w-7xl mx-auto pb-20 px-5 2xl:px-0">
		  <div className="flex gap-2 items-center">
			<a href="./">
			  <div className="flex gap-2 items-center pr-6 bg-base-100 text-base-content py-3 px-3 rounded-full mt-2 transition">
				<button>
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
					  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
					/>
				  </svg>
				</button>
				<span>Back</span>
			  </div>
			</a>
		  </div>
  
		  <div className="mt-10 flex justify-center items-center min-h-[65vh]">
			<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
		  </div>
		</div>
	  </div>
	);
  }