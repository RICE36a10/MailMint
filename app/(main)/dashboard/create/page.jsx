import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Sparkles} from "lucide-react";
import {AIinputBox} from "@/components/custom/AIinputBox";

export default function Create() {
    return (
        <div className={'px-10 md:px-28 lg:px-64 xl:px-72 mt-20 '}>
            <div className={'flex flex-col items-center '}>
                <h2 className={'font-bold text-3xl text-primary           '}>
                    Create New Email Template
                </h2>
                <p className={'text-lg text-gray-400        '}>
                    design with help of AI
                </p>

                <Tabs defaultValue="AI" className="w-[500px]  mt-10   ">
                    <TabsList>
                        <TabsTrigger value="AI">Create with AI  <Sparkles className={'h-5 w-4 ml-2'}/> </TabsTrigger>
                        <TabsTrigger value="Scratch">Start from Scratch</TabsTrigger>
                    </TabsList>
                    <TabsContent value="AI">
                        <AIinputBox/>
                    </TabsContent>
                    <TabsContent value="Scratch">
                        <div className={' ml-16 mt-10'}>
                            {/*

                                todo manually

                                keep a button for start now
                                create a new id in a table
                                forward to the editor directly
                                from here
                                route + tid

                            */}
                            Coming soon
                        </div>
                    </TabsContent>
                </Tabs>



            </div>
        </div>
    );
}
