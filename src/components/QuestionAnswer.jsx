import Answers from "./Answers";


const QuestionAnswer = ({item,index}) =>{
    return(
        <>
        
              <div key={index+Math.random()} className={item.type=='q'?'flex justify-end':''}>
                {
                    item.type=='q'?
                <li key={index+Math.random()} className="max-w-[70%] text-right px-4 py-3 mb-3 
          rounded-tl-3xl rounded-br-3xl rounded-bl-3xl shadow-md
          bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 
          dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700
          text-zinc-800 dark:text-zinc-100
          "><Answers ans={item.text} totalResult={1} index={index} type={item.type}/></li>

                :
                 <div className="flex flex-col space-y-2">
          {item.text.map((ansItem, ansIndex) => (
            <li
              key={ansIndex}
              className="w-fit max-w-[75%] text-left px-4 py-3 mb-2 
              rounded-2xl shadow-md
              bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 
              dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800
              text-zinc-800 dark:text-zinc-200
              rounded-tl-sm text-lg"
            >
              <Answers
                ans={ansItem}
                totalResult={item.length}
                index={ansIndex}
                type={item.type}
              />
            </li>
          ))}
        </div>
                }
              </div>
        </>
    )
}

export default QuestionAnswer;