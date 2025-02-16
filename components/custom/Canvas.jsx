"use client"
import React, {useState} from 'react'
import {useDragDropLayout, useEmailTemplate, useScreenSize} from "@/app/provider";

export function Canvas() {
    const {ScreenSize, setScreenSize} = useScreenSize();
    const {DragElementLayout, setDragElementLayout} = useDragDropLayout();
    const {emailTemplate, setEmailTemplate} = useEmailTemplate();
    const [dragOver, setDragOver] = useState(false);


    const OndragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
        console.log("Ondrag over");
    }
    const onDropHandler = () =>{
        setDragOver(false);
        console.log(DragElementLayout?.dragLayout, "helllo ");
        if(DragElementLayout?.dragLayout){
            setEmailTemplate(prev => [...prev,setDragElementLayout?.dragLayout])
        }
    }
    return (
        <div className={'mt-20 flex justify-center '}>
            <div className={`bg-white p-6 w-full 
            ${ScreenSize === 'desktop' ? 'max-w-2xl':'max-w-lg'}
            ${dragOver && 'bg-purple-100 p-4'}
            `}
            onDragOver={OndragOver}
                 onDrop={()=> onDropHandler()}
            >

            </div>
        </div>
    )
}
