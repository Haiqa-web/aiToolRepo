const RecentSearch = ({
  recentHistory,
  setRecentHistory,
  setSelectedHistory,
}) => {
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  const clearSelectedHistory = (selectedItem) => {
    let history = JSON.parse(localStorage.getItem("history"));
    console.log(history);
    history = history.filter((item) => {
      if (item != selectedItem) {
        return item;
      }
    });
    setRecentHistory(history);
    localStorage.setItem("history", JSON.stringify(history));
    console.log(history, selectedItem);
  };

  return (
    <>
      <div className="col-span-1 
    p-4
    bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 
    dark:from-zinc-900 dark:via-zinc-800 dark:to-black
    rounded-2xl shadow-lg
    flex flex-col ">
        <h1 className="text-sm dark:text-white text-zinc-800 flex justify-center text-center ">
          <span>Recent Search</span>

          <button
            onClick={clearHistory}
            className='onClick={clearHistory}
      className="cursor-pointer p-1 rounded-md hover:bg-red-200 dark:hover:bg-zinc-700 transition'
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
            height="15px"
            viewBox="0 -960 960 960"
            width="15px"
              className="fill-black dark:fill-[#EFEFEF]"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>
        </h1>
        <ul className="text-left overflow-y-auto mt-4 space-y-3 max-h-72 pr-1">
  {recentHistory &&
    recentHistory.map((item, index) => (
      <li
        key={index}
        className="flex items-center w-full"
      >
        <span
          onClick={() => setSelectedHistory(item)}
          className="flex-1 cursor-pointer px-4 py-2
                     rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-3xl
                     truncate text-xs
                     bg-red-100 dark:bg-zinc-700
                     border border-red-200 dark:border-zinc-600
                     text-zinc-800 dark:text-zinc-300
                     hover:bg-red-200 dark:hover:bg-zinc-600
                     transition"
        >
          {item}
        </span>
        <button
          onClick={() => clearSelectedHistory(item)}
          className="ml-2 p-2 rounded-md opacity-70 hover:opacity-100 hover:bg-red-200 dark:hover:bg-zinc-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="12px"
            viewBox="0 -960 960 960"
            width="12px"
            className="fill-black dark:fill-zinc-300"
          >
            <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
          </svg>
        </button>
      </li>
    ))}
</ul>
      </div>
    </>
  );
};

export default RecentSearch;
