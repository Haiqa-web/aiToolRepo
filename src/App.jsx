
import { useEffect, useId,useRef,useState } from 'react'
import './App.css'
import {url} from './constants'
import RecentSearch from './components/RecentSearch';
import QuestionAnswer from './components/QuestionAnswer';

function App() {

  const [question,setQuestion] = useState();
  const [result,setResult] = useState([]);
  const[recentHistory,setRecentHistory]=useState(JSON.parse(localStorage.getItem('history')))
  const[selectedHistory,setSelectedHistory] = useState('');
  const scrollToAns = useRef();
  const[loader,setLoader] = useState(false)

  const id = useId();

  

  const askQuestion = async()=>{
    if(!question && !selectedHistory){
      return false
    }


    if(question){
      if(question !== undefined && question !== null){
      let history = JSON.parse(localStorage.getItem('history') || '[]');
      history = history.slice(0,19)
      history = [question, ...history]
      history = history.map((item)=>
      item.charAt(0).toUpperCase()+item.slice(1));
      history = [...new Set(history)];
      localStorage.setItem('history',JSON.stringify(history))
      setRecentHistory(history);
    }else{
        localStorage.setItem('history',JSON.stringify([question]))
        setRecentHistory([question]);
         }
    }
    
    const payloaData = question? question: selectedHistory
    const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": payloaData
          }
        ]
      }
    ]
  }

  setLoader(true);


    const response = await fetch(url,{
      method:"POST",
      body:JSON.stringify(payload)
    });
    const data = await response.json();
    let dataString = data.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item)=>item.trim());

    // console.log(dataString);
    // setResult([question,dataString])
    setResult([...result,{type:'q',text:question?question:selectedHistory},{type:'a',text:dataString}]);
    setQuestion('')

    setTimeout(()=>{
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight
    },500)

    setLoader(false);
  }


  const isEnter = (event) =>{
    if(event.key=='Enter'){
      askQuestion();
    }
  }

  useEffect(()=>{
    console.log(selectedHistory)
    askQuestion();

  },[selectedHistory])

  //Dark mode feature

  const[darkMode,setDarkMode] = useState('dark');
  useEffect(()=>{
    console.log(darkMode)

    if(darkMode=='dark'){
      document.documentElement.classList.add('dark')
    }
    else{
      document.documentElement.classList.remove('dark')
    }
  })


  

  return (
   <div className="min-h-screen w-full relative overflow-hidden 
  bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 
  dark:from-gray-950 dark:via-slate-900 dark:to-black
">
  <div className="absolute top-[-80px] left-[-80px] w-[350px] h-[350px] 
    bg-pink-200/40 dark:bg-purple-900/30 
    rounded-full blur-3xl">
  </div>

  <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] 
    bg-blue-200/40 dark:bg-indigo-800/30 
    rounded-full blur-3xl">
  </div>

  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
    w-[500px] h-[500px] 
    bg-purple-100/30 dark:bg-fuchsia-900/20 
    rounded-full blur-3xl">
  </div>



 <div className="relative z-10 grid grid-cols-5 h-screen text-center">
      <select onChange={(event)=>setDarkMode(event.target.value)} className=' fixed bottom-4 left-4
    px-4 py-2
    rounded-2xl
    bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50
    dark:bg-gradient-to-r dark:from-zinc-800 dark:via-zinc-900 dark:to-blue-950
    text-zinc-800 dark:text-zinc-100
    border border-red-200 dark:border-zinc-600
    shadow-md hover:shadow-lg
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-zinc-500
    cursor-pointer
    z-20
  " '>
        <option value="dark"
            className="bg-white text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">Dark</option>
        <option value="light"
         className="bg-white text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">Light</option>
      </select>

      <RecentSearch recentHistory={recentHistory} setRecentHistory={setRecentHistory} setSelectedHistory={setSelectedHistory}/>


        < div className="col-span-4 p-12 pt-2 flex flex-col h-screen text-center">
 <h1
  className="text-5xl font-bold tracking-wide leading-snug
  bg-clip-text text-transparent 
  bg-gradient-to-r from-rose-400 via-indigo-400 to-sky-500
  pb-0 drop-shadow-md animate-fade-in"
>
  Hello User, <br /> Ask Me Anything!
</h1>
  <p className="text-xl text-gray-500 drop-shadow-blue-400k:text-zinc-400  mb-3 mt-2 tracking-widest">
    I’m here to help you with anything you need ✨
  </p>





       {
        loader?
         <div role="status">
    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg mb-6">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>:null
       }

        <div ref={scrollToAns} className=' flex-1 overflow-y-auto no-scrollbar'>
          <div className='dark:text-zinc-300 text-zinc-800 text-lg  '>

          <ul>
              {
              result.map((item,index)=>(
                <QuestionAnswer key={index} item={item} index={index}/>
              ))
            }
          </ul>

          </div>

        </div>
      {/* <div className='mt-5'>
          <div className='dark:bg-zinc-800  bg-red-100 w-1/2 p-1 pr-5
          dark:text-white text-black m-auto rounded-4xl border border-zinc-700 flex h-16'>  */}
  
  <div className="mt-6 flex justify-center">
  <div
    className="flex items-center gap-3 px-4 py-3 
    w-[90%] max-w-2xl
    bg-gradient-to-r from-blue-200 via-purple-100 to-indigo-100 
    dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800
    border border-zinc-300 dark:border-zinc-700
    rounded-3xl shadow-md
    transition-all duration-300"
  >
    <input
      type="text"
      placeholder="Ask me anything..."
      value={question || ''}
      onChange={(event) => setQuestion(event.target.value)}
      onKeyDown={isEnter}
      className="w-full h-full px-4 py-3 outline-none text-lg 
        rounded-tl-3xl rounded-tr-md rounded-bl-md rounded-br-3xl
        bg-red-100 dark:bg-zinc-700
        border border-red-200 dark:border-zinc-600
        text-zinc-800 dark:text-zinc-300
        placeholder-zinc-400 dark:placeholder-zinc-500
        hover:bg-red-200 dark:hover:bg-zinc-600
        transition-all duration-300"
    />

    <button
      onClick={askQuestion}
      className="px-5 py-2 rounded-xl font-medium
      bg-gradient-to-r from-purple-300 via-pink-200 to-indigo-200
      dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700
      text-zinc-800 dark:text-white shadow-sm
      hover:scale-105 active:scale-95
      transition-all duration-300"
    >
      Ask
    </button>
  </div>
</div>
      </div>
    </div>
  </div>
  )
}

export default App
