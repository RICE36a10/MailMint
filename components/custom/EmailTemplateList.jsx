import React, {useState} from 'react'
import Image from 'next/image';
import {Button} from "@/components/ui/button";
function EmailTemplateList() {
    const [emaillist, setEmailList] = useState([]);

    return(
        <div>
            <h2 className={'font-bold text-xl text-primary mt-6 '}>workspace</h2>
            {
                emaillist?.length === 0 && <div className={'flex justify-center mt-7 flex-col items-center  '}>
                    <Image src = {'/landing.png'} alt={'temp'} height={250} width={250}></Image>
                <Button className={'mt-7'} >+ create new</Button>

                </div>
            }
        </div>
    )
}
export default EmailTemplateList;
