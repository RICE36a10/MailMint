"use client";
import React, {useState} from 'react'
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import Prompt from "@/Data/Prompt";
import axios from "axios";

export function AIinputBox() {
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);

    const Ongenerate = async () => {
        const PROMPT = Prompt.EMAIL_PROMPT+"\n-"+userInput;
        setLoading(true);
        try {
            const result = await axios.post('/api/ai-email-generator', {
                prompt: PROMPT,
            })
            console.log(result.data);
            setLoading(false);
        }catch (e){
            console.log(e);
            setLoading(false);
        }


    }

    return (
        <div className={'mt-5 flex flex-col gap-3  '}>
            <p className={'ml-2 mb-1'}> Provide detail for the template</p>
            <Textarea onChange = {(e) => setUserInput(e.target.value)} placeholder="Enter detail for the template" rows="5" className={'text-xl'}  />
            <Button
                className={'w-1/5 transition-all hover:scale-105'}
                disabled={(userInput?.length <= 10 || loading)}
                onClick={Ongenerate}
            > Generate </Button>
        </div>
    )
}
