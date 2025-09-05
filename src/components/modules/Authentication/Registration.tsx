/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Password from "@/components/ui/password"
import { useRegistrationMutation } from "@/redux/features/auth/auth.api"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router"


const RegisterSchema = z.object({
  name: z.string().min(3, { error: "Name is too short" }).max(50),
  email: z.email(),
  password: z.string()

    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
  confirmPassword: z.string().min(6, { error: "confirm password is too short" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "password do not match",
  path: ["confirmPassword"]
})

export function Registration({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [Registration] = useRegistrationMutation()
  const navigate=useNavigate()
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }

  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password
    }
    console.log(userInfo);
    try {
      const result = await Registration(userInfo).unwrap()
      console.log(userInfo);
      console.log(result);
      if (result) {
        toast.success("successfully created your account")
        navigate("/verify",{ state: data.email })
      }
    } catch (error) {
      console.log(error);
      // toast.error("something went wrong")
    }

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Unlock New Experiences  Register Today</h1>

      </div>
      <div className="grid gap-6">

        <Form{...form}>

          <form onSubmit={form.handleSubmit(onSubmit)}{...props}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="sadman@gmail.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field}></Password>
                    {/* <Input type="password" placeholder="password" {...field} /> */}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password {...field}></Password>

                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-3">
              Register
            </Button>
          </form>

        </Form>


        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Link to={"https://travel-management-server-gilt.vercel.app/api/v1/auth/google"}>

          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>
        </Link>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          login
        </a>
      </div>
    </div>
  )
}
