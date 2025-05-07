const DeleteRideModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-80 backdrop-blur-xl">
        <div className="bg-stone-950 rounded-3xl shadow-2xl p-8 w-full max-w-lg text-center border border-zinc-800 transform transition-all">
          <div className="flex flex-col items-center">
            {/* Warning Icon */}
            <div className="mb-6 text-red-500 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
  
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-red-500 mb-2">
                Warning: About to Delete Ride
              </h2>
              <p className="text-stone-400 text-sm">
                This action will remove your ride from the platform
              </p>
            </div>
  
            <div className="bg-stone-900 rounded-xl p-6 mb-8 border border-stone-800">
              <p className="text-stone-300 text-lg font-semibold mb-4">
                Before you delete, consider this:
              </p>
  
              <div className="grid gap-4 text-left">
                <div className="flex items-start space-x-3 bg-stone-950 p-3 rounded-lg transform transition-all hover:scale-102">
                  <div className="flex-shrink-0 w-6 h-6 text-violet-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.171-.879-1.171-2.303 0-3.182C10.536 7.719 11.768 7.5 12 7.5c.725 0 1.45.22 2.003.659" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-violet-400 font-semibold">Financial Impact</p>
                    <p className="text-stone-400 text-sm">Share travel costs and save up to 50% per trip</p>
                  </div>
                </div>
  
                <div className="flex items-start space-x-3 bg-stone-950 p-3 rounded-lg transform transition-all hover:scale-102">
                  <div className="flex-shrink-0 w-6 h-6 text-violet-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-violet-400 font-semibold">Social Connection</p>
                    <p className="text-stone-400 text-sm">Build meaningful connections with fellow travelers</p>
                  </div>
                </div>
  
                <div className="flex items-start space-x-3 bg-stone-950 p-3 rounded-lg transform transition-all hover:scale-102">
                  <div className="flex-shrink-0 w-6 h-6 text-violet-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-violet-400 font-semibold">Environmental Impact</p>
                    <p className="text-stone-400 text-sm">Reduce carbon footprint and traffic congestion</p>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="flex justify-center gap-4 w-full">
              <button
                onClick={onConfirm}
                className="px-6 py-3 rounded-full text-sm font-bold tracking-wider bg-red-950 text-red-200 hover:bg-red-900 transition-all duration-200 uppercase w-full max-w-[160px] border border-red-800 hover:scale-105"
              >
                Delete Anyway
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full text-sm font-bold tracking-wider bg-violet-600 text-white hover:bg-violet-700 transition-all duration-200 uppercase w-full max-w-[160px] hover:scale-105"
              >
                Keep Ride
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteRideModal;
  