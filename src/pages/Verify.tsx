import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useSendotpMutation, useVerifyotpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { z } from "zod"

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

const Verify = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [email] = useState(location.state);
    const [confirm, setConfirm] = useState(false)
    const [sendotp] = useSendotpMutation()
    const [verifyotp] = useVerifyotpMutation()
    const [timer, setTimer] = useState(120)
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    useEffect(() => {
        if (!email) {
            navigate("/")
        }
    },)

    useEffect(() => {
        const timerId = setInterval(() => {
            if (email && confirm) {
                setTimer((prev) => (prev > 0 ? prev - 1 : 0))
            }
        }, 1000);
        return ()=>clearInterval(timerId)
    }, [email, confirm])
    const handleConfirm = async () => {
        setConfirm(true)
        setTimer(120)
        const res = await sendotp({ email: email })
        if (res) {
            toast.success("Otp send to your email")
        }
        else {
            toast.error("something went wrong")
        }


    }

    const onSubmit = async (data) => {
        const userinfo = {
            email: email,
            otp: data.pin
        }
console.log(userinfo);
        try {
            const res = await verifyotp(userinfo)
            console.log(res);
            if (res.data.statusCode === 200) {
                toast.success("verified successfully")
                navigate("/")
            }
          

        } catch (err) {
            toast.error("Otp expired,Generate a new Otp")

        }

    }
    return (

        <div className="  text-center flex flex-col justify-center items-center  min-h-screen">

            {
                confirm ? <>
                    <Card className="w-full max-w-md ">
                        <img className="w-40 mx-auto " src="/src/assets/icons/otp.png"></img>

                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-4">
                                <FormField
                                    control={form.control}
                                    name="pin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <h1 className="text-3xl font-bold lg:text-center mt-5">Verification Code</h1>
                                            <div className="flex justify-center mt-4">
                                                <FormControl className="flex justify-center " >
                                                    <InputOTP maxLength={6} {...field}>
                                                        <InputOTPGroup  >
                                                            <InputOTPSlot index={0} />
                                                        </InputOTPGroup>

                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={1} />
                                                        </InputOTPGroup>


                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={2} />
                                                        </InputOTPGroup>

                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={3} />
                                                        </InputOTPGroup>

                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={4} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={5} />
                                                        </InputOTPGroup>

                                                    </InputOTP>
                                                </FormControl>
                                            </div>

                                            <FormDescription className="flex justify-center items-center gap-12">
                                                <button disabled={timer !== 0} onClick={handleConfirm} className=" font-bold">
                                                    {timer !== 0 ? <p>{`Resend Otp In ${timer}s`}</p> : <p className="text-red-600 ">Resend otp</p>}
                                                </button>
                                            </FormDescription>
                                            <FormDescription className="mt-3">
                                                Please enter the one-time password sent to your gmail.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="mt-5" type="submit">verify otp</Button>
                            </form>
                        </Form>
                    </Card >
                </> : <Card className="w-full max-w-md">
                    <img className="w-40 mx-auto " src="/src/assets/icons/unverified.png"></img>

                    <CardHeader>
                        <CardTitle>Verify your Account</CardTitle>
                        <CardDescription>
                            {`we will send you an OTP at ${email}`}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex-col gap-2">
                        <Button onClick={handleConfirm} type="submit" className="w-1/2">
                            Confirm
                        </Button>
                    </CardFooter>
                </Card>
            }



        </div>


    );
};

export default Verify;