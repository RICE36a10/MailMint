"use client";
import React, {useState} from 'react'
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import Prompt from "@/Data/Prompt";
import axios from "axios";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {v4 as uuidv4} from "uuid";
import {useUserDetail} from "@/app/provider";
import {LoaderCircle} from "lucide-react";

export function AIinputBox() {
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const SaveTemplate = useMutation(api?.emailTemplate?.SaveTemplate);
    const {userDetail, SetUserDetail} = useUserDetail();

    const tid = uuidv4()

    const Ongenerate = async () => {
        const PROMPT = Prompt.EMAIL_PROMPT+"\n-"+userInput;
        setLoading(true);
        try {
            const result = await axios.post('/api/ai-email-generator', {
                prompt: PROMPT,
            })

            console.log(result.data);
            console.log("AI Response:", result.data); // Debugging

            // const respo = await SaveTemplate({
            //     tid:tid,
            //     design:result.data,
            //     email:userDetail?.email,
            // })

            const respo = await SaveTemplate({
                tid: tid,
                design: result.data?.response || "Error generating response",
                email: userDetail?.email,
            });

            console.log(respo);
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
            > {loading === true ? <span className={'scale-125'}><LoaderCircle className={'animate-spin'}/></span>  : 'Generate'} </Button>
        </div>
    )
}
