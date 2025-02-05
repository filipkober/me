import { useToast } from '@/hooks/use-toast'
import { CodePayload } from './CodeNode'
import hljs from 'highlight.js'
import "highlight.js/styles/night-owl.css"
import { CircleCheckBig, Copy } from 'lucide-react'

export default function CodeNodeComponent({canCopy, language, lines, showLineNumbers}: CodePayload) {

    const {toast} = useToast();

  return (
    <div className='relative hljs pl-2 w-fit pr-24 max-w-full'>
        <pre>
            <code>
            {lines.map((line, i) => {
                const element = hljs.highlight(line, {language: language});
                return <div key={i} className='flex flex-row gap-2'>{showLineNumbers && <span className='select-none'>{i + 1}</span>}<div dangerouslySetInnerHTML={{__html: element.value}} /></div>
            })}
            </code>
        </pre>
        {canCopy && <button className='absolute top-2 right-2 aspect-square bg-transparent' onClick={() => {
            navigator.clipboard.writeText(lines.join('\n'));
            toast({
                title: "Code copied",
                description: <div className='flex flex-row gap-2'><CircleCheckBig className='text-[hsl(var(--success))]' /> 
                <span className='my-auto'>Code copied to clipboard!</span>
                </div>
                
            });
        }}><Copy /></button>}
    </div>
  )
}