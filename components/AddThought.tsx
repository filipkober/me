"use client";

import { addThought } from "@/app/fun/random-thoughts/actions";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function AddThought() {

    const [value, setValue] = useState('');
    const {toast} = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const onClick = async () => {
        const t = await addThought(value);
        setValue('');
        if(t) {
            toast({
                title: "Success",
                description: "Thought added, refreshing...",
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            toast({
                title: "Error",
                description: "You are not authorized to add thoughts",
                variant: "destructive",
            });
        }
    }

  return (
    <div className='p-4 bg-gray-500 max-w-full'>
        <div className='bg-black text-green-600 p-4 font-[pressStart2P] flex gap-4 flex-wrap'>
            <div className="flex flex-row gap-2 max-w-full">
            <span className='my-auto'>&gt;</span>
            <input type='text' placeholder='add a thought...' className='bg-black text-green-600 font-[pressStart2P] border-none max-w-[90%]' value={value} onChange={handleChange} />
            </div>
            <button className='bg-green-600 text-black font-[pressStart2P] p-2 mx-auto' onClick={onClick}>Add Thought</button>
        </div>
    </div>
  )
}
