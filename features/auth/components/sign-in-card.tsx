'use client';

import {z} from 'zod';
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import Link from 'next/link';
import { DottedSeparator } from "@/components/dotted-separator"
import {useForm} from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {zodResolver} from "@hookform/resolvers/zod"
import {
    Form, FormControl, FormField, FormItem, FormMessage
} from "@/components/ui/form"
import {loginSchema} from "../schema"
import { useLogin } from '../api/use-login';
import { useRouter } from "next/navigation";


export const SignInCard = () =>{
    const router = useRouter();
    const { mutate, isError, error, isPending } = useLogin();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues:{
            email: "",
            password:"",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        mutate({json: values}, {
            onSuccess: () => {
                router.push("/");
            }
        });
    };

    return(
        <Card className="w-full h-full md:w-121.75 border-none shadow-none">
            {isError && <div className="text-red-500 text-center mb-2">{error?.message || "Sign in failed"}</div>}
            <CardHeader className="flex items-center justify-center text-center p-2">
                <CardTitle className="text-3xl font-bold">
                    Welcome back
                </CardTitle>
            </CardHeader>
            <div className="px-5 py-0">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField 
                        name='email'
                        control={form.control}
                        render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                {...field}
                                type="email" placeholder="Enter Email Address" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>


                    <FormField 
                        name='password'
                        control={form.control}
                        render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                {...field}
                                type="password" placeholder="Enter Password" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <Button disabled={isPending} size="lg" className="w-full mt-4">
                        Login
                    </Button>
                </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-5 flex flex-col gap-y-3">
                <Button disabled={isPending}
                variant="secondary"
                size="lg" className="w-full">
                    <FcGoogle className="mr-2 size-5"/>
                    Login with Google
                </Button>
                <Button disabled={isPending}
                variant="secondary"
                size="lg" className="w-full">
                    <FaGithub className="mr-2 size-5"/>
                    Login with Github
                </Button>
            </CardContent>
            {/* <div>
                <DottedSeparator/>
            </div> */}
            <CardContent>
                <p>
                    Don&apos;t have an account?
                    <Link href='/sign-up'>
                        <span className='text-blue-700 font-medium'>&nbsp;Sign Up</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}