"use client"

import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import Link from "next/link";
import {z} from "zod";
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form, FormControl, FormField, FormItem, FormMessage
} from "@/components/ui/form"
import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import {
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle,
    CardDescription    
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { registerSchema } from "../schema";
import { useRegister } from "../api/use-register";
import { useRouter } from "next/navigation";


export const SignUpCard = () =>{
    const router = useRouter();
    const { mutate, isPending, isError, error } = useRegister();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),            defaultValues:{
            name:"",
            email: "",
            password:"",
            },
        });
    
    const onSubmit = (values: z.infer<typeof registerSchema>) => {
                mutate({json: values}, {
                    onSuccess: () => {
                        router.push("/");
                    }
                });
    };

    return(
        <Card className="w-full h-full md:w-121.75 border-none shadow-none">
            {isError && <div className="text-red-500 text-center mb-2">{error?.message || "Registration failed"}</div>}
            <CardHeader className="flex flex-col items-center justify-center text-center p-5">
                <CardTitle className="text-3xl font-bold">
                    Sign Up
                </CardTitle>
                <CardDescription>
                    By signing up, you agree to {" "}
                    <Link href="/privacy">
                        <span className="text-blue-700">Privacy Policy </span>
                    </Link>
                    and{" "}
                    <Link href="/terms">
                        <span className="text-blue-700">Terms of Service</span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField 
                        name='name'
                        control={form.control}
                        render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                {...field}
                                type="text" placeholder="Enter Your Name" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <FormField 
                        name='email'
                        control={form.control}
                        render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                {...field}
                                type="email" placeholder="Enter Your Email Address" />
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
                                type="password" placeholder="Enter Your Password" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <Button disabled={isPending} size="lg" className="w-full mt-4">
                        Register
                    </Button>
                </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-5 flex flex-col gap-y-4">
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
            <CardContent>
                <p>
                    Already have an account? 
                    <Link href='/sign-in'>
                        <span className='text-blue-700 font-medium'>&nbsp;Sign In</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}