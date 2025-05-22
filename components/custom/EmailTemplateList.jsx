import React, {useContext, useEffect, useState} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {useConvex} from "convex/react";
import {useUserDetail} from "@/app/provider";
import {api} from "@/convex/_generated/api";
import * as convex from "@/convex/_generated/server";
import {GetAllUserTemplate, DeleteTemplate} from "@/convex/emailTemplate";
import {LoaderCircle} from "lucide-react";
import {Trash} from "lucide-react";

function EmailTemplateList() {
    const [emailList, setEmailList] = useState([]);

    const Convex = useConvex();
    const {userDetail, setUserDetail} = useUserDetail();
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        userDetail && GetTemplateList();
    }, [userDetail]);


    const GetTemplateList = async () => {
        if (!userDetail?.email) {
            console.log("Error: User email is missing in emailtemplatelist", userDetail);
            return;
        }
        setLoading(true); // ✅ Start loading
        try {
            const result = await Convex.query(api.emailTemplate.GetAllUserTemplate, {
                email: userDetail.email,
            });
            console.log("Templates fetched:", result);
            setEmailList(result);
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
        setLoading(false); // ✅ Stop loading
    };

    // <LoaderCircle className={'animate-spin'}/></span>

    const handleDelete = async (templateId) => {
        if (!confirm("Are you sure you want to delete this template?")) return; // ✅ Confirmation prompt
        try {
            await Convex.mutation(api.emailTemplate.DeleteTemplate,
                { tid: templateId }
            ); // ✅ Call delete API
            setEmailList((prevList) => prevList.filter((item) => item.tid !== templateId)); // ✅ Remove from UI
            console.log("Template deleted:", templateId);
        } catch (error) {
            console.error("Error deleting template:", error);
        }
    };

    return (
        <div>
            <h2 className="font-bold text-xl text-primary mt-6">Workspace</h2>

            {loading ? (
                <div className="flex justify-center items-center mt-7">
                    <LoaderCircle className="animate-spin h-10 w-10 text-gray-500" />
                </div>
            ) : emailList.length === 0 ? (
                <div className="flex justify-center mt-7 flex-col items-center">
                    <Image src="/landing.png" alt="No Templates" height={250} width={250} />
                    <Link href="/dashboard/create">
                        <Button className="mt-7">+ Create New</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {emailList.map((item, index) => (
                        <div key={index} className="p-2 rounded-lg shadow-md p-5 border relative">
                            <button
                                onClick={() => handleDelete(item.tid)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                                <Trash size={20} />
                            </button>
                            <Image src="/emailbox.png" className="mt-2" width={200} height={200} alt="Email" />
                            <h2>{item?.description}</h2>
                            <Link href={`/editor/${item?.tid}`}>
                                <Button className="mt-2 w-full">View/Edit</Button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default EmailTemplateList;
