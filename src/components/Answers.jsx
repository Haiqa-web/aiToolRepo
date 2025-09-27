import { useEffect,useState } from "react";
import { checkHeading, replaceHeadingStars } from "../helper";
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import ReactMarkdown from 'react-markdown'

const Answers = ({ans,index,totalResult,type}) =>{
    
    const[heading,setHeading] = useState(false);
    const[answer,setAnswer] = useState(ans);

    useEffect(() =>{
        if(checkHeading(ans)){
            setHeading(true);
            setAnswer(replaceHeadingStars(ans))
        }
    }, [ans])

    // const renderers  ={
    //     code({node,inline,className,children,...props}){
    //         const match = /language-(\w+)/.exec(className || '');
    //     return !inline && match?(
    //         <SyntaxHighlighter
    //         {...props}
    //         children={String(children).replace(/\n$/,'')}
    //         language={match[1]}
    //         style={dark}
    //         PreTag="div"
    //         />
    //     ):(
    //         <code {...props} className={className}>
    //             {children}
    //         </code>
    //     )
    //     }
        
    // }

    
    return(
        <div>
            {
                index==0 && totalResult>1?<span className="pt-2 text-sm block text-white">{answer}</span>:
                heading?<span className="pt-2 text-sm block dark:text-white text-zinc-800">{answer}</span>:
                <span className={`${type=='q'?'pl-1':'pl-5'} text-sm`}>{answer}
                </span>
            }
          
        </div>
    )
}

export default Answers;