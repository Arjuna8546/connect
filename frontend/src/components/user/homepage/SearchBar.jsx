import { CalendarIcon, UserIcon } from "./Icons";

export const SearchBar = () => {
    return (
        <div className="flex gap-4 justify-center px-6 py-5 max-md:flex-wrap max-sm:px-2.5">
            <div className="flex items-center gap-2.5 p-3 rounded bg-neutral-900 max-w-[280px] w-full">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 21.3334C14.5855 21.3334 13.229 20.7715 12.2288 19.7713C11.2286 18.7711 10.6667 17.4146 10.6667 16.0001C10.6667 14.5856 11.2286 13.229 12.2288 12.2288C13.229 11.2287 14.5855 10.6667 16 10.6667C17.4145 10.6667 18.771 11.2287 19.7712 12.2288C20.7714 13.229 21.3333 14.5856 21.3333 16.0001C21.3333 17.4146 20.7714 18.7711 19.7712 19.7713C18.771 20.7715 17.4145 21.3334 16 21.3334Z"
                        fill="#16DB95"
                        fillOpacity="0.666667"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Leaving from..."
                    className="bg-transparent w-full text-sm font-bold uppercase text-stone-300 tracking-[2.73px] placeholder:text-stone-500 focus:outline-none"
                />
            </div>

            {/* Going to */}
            <div className="flex items-center gap-2.5 p-3 rounded bg-neutral-900 max-w-[280px] w-full">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 21.3334C14.5855 21.3334 13.229 20.7715 12.2288 19.7713C11.2286 18.7711 10.6667 17.4146 10.6667 16.0001C10.6667 14.5856 11.2286 13.229 12.2288 12.2288C13.229 11.2287 14.5855 10.6667 16 10.6667C17.4145 10.6667 18.7711 11.2287 19.7713 12.2288C20.7715 13.229 21.3334 14.5856 21.3334 16.0001C21.3334 17.4146 20.7715 18.7711 19.7713 19.7713C18.7711 20.7715 17.4145 21.3334 16 21.3334Z"
                        fill="#D1D1D1"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Going to..."
                    className="bg-transparent w-full text-sm font-bold uppercase text-stone-300 tracking-[2.73px] placeholder:text-stone-500 focus:outline-none"
                />
            </div>

            {/* Select date */}
            <div className="flex items-center gap-2.5 p-3 rounded bg-neutral-900 max-w-[280px] w-full">
                <CalendarIcon className="text-white" />
                <input
                    type="date"
                    className="bg-transparent w-full text-sm font-bold uppercase text-stone-300 tracking-[2.73px] placeholder:text-stone-500 focus:outline-none"
                />
            </div>

            {/* Number of travelers */}
            <div className="flex items-center gap-2.5 p-3 rounded bg-neutral-900 max-w-[280px] w-full">
                <UserIcon className="text-white" />
                <input
                    type="number"
                    placeholder="No. of travelers"
                    min="1"
                    className="bg-transparent w-full text-sm font-bold uppercase text-stone-300 tracking-[2.73px] placeholder:text-stone-500 focus:outline-none"
                />
            </div>

            <button className="w-44 text-base font-bold text-black uppercase bg-white shadow-2xl h-[76px] rounded-[48px] tracking-[3.15px] max-md:w-full">
                search
            </button>
        </div>
    );
};
