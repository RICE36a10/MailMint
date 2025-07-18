"use client";
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function SignInButton({Messege}) {
    const CreateUser = useMutation(api.users.CreateUser);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userDetail = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: { Authorization: `Bearer ${tokenResponse?.access_token}` },
                    },
                );
                const user = userDetail.data;

                if (typeof window !== "undefined") {
                    localStorage.setItem("userDetail", JSON.stringify(user));
                }

                // Save user to DB
                const result = await CreateUser({
                    email: user?.email,
                    name: user?.name,
                    picture: user?.picture,
                });

                const userDetails = {
                    ...user,
                    _id: result?.id ?? result,
                };

                if (typeof window !== "undefined") {
                    localStorage.setItem("userDetail", JSON.stringify(userDetails));
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        },
    });

    return (
        <div>
            <Button onClick={() => googleLogin()}>{Messege}</Button>
        </div>
    );
}
