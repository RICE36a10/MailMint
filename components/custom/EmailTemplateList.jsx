import React, {useContext, useEffect, useState} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {useConvex} from "convex/react";
import {useUserDetail} from "@/app/provider";
import {api} from "@/convex/_generated/api";
import * as convex from "@/convex/_generated/server";
import {GetAllUserTemplate} from "@/convex/emailTemplate";

function EmailTemplateList() {
    const [emailList, setEmailList] = useState([]);

    const Convex = useConvex();
    const {userDetail, setUserDetail} = useUserDetail();


    useEffect(() => {
        userDetail && GetTemplateList();
    }, [userDetail]);


    const GetTemplateList = async () => {
        if (!userDetail?.email) {
            console.log("Error: User email is missing in emailtemplatelist", userDetail);
            return;
        }
        try {
            const result = await Convex.query(api.emailTemplate.GetAllUserTemplate, {
                email: userDetail.email, // ✅ Ensure email is provided
            });
            console.log("Templates fetched:", result);
            setEmailList(result);
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
    };

    // const GetTemplateList = async () => {
    //     const result = await Convex.query(api.emailTemplate.GetAllUserTemplate, {
    //         email: userDetail.email,
    //     })
    //     console.log(result);
    //     setEmailList(result);
    // }


    return (
        <div>
            <h2 className={"font-bold text-xl text-primary mt-6 "}>workspace</h2>
            {emailList?.length === 0 ? (
                    <div className={"flex justify-center mt-7 flex-col items-center  "}>
                        <Image
                            src={"/landing.png"}
                            alt={"temp"}
                            height={250}
                            width={250}
                        />
                        <Link href={'/dashboard/create'}>
                            <Button className={"mt-7"}>+ create new</Button>
                        </Link>
                    </div>
                )
                :
                <div className={'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
                    {emailList?.map((item, index) => (
                        <div key={index} className={'p-2 rounded-lg shadow-md p-5 border '}>
                            <Image src={'/emailbox.png'} className={'mt-2'} width={200} height={200} alt={'email'}/>
                            <h2>{item?.description}</h2>
                            <Link href={'/editor/'+item?.tid}>
                                <Button className={' mt-2 w-full '}>View/Edit</Button>
                            </Link>
                        </div>
                    ))
                    }
                </div>
            }
        </div>
    );
}
export default EmailTemplateList;
