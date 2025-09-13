import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useUpdateTourTypesMutation } from "@/redux/features/Tour/tour.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaRegEdit } from "react-icons/fa"
import z from "zod"

const UpdateTourTypeSchema = z.object({
    name: z.string().min(3, { error: "Name is too short" }).max(50),


})

export function UpdateTourTypeModal({ id }) {

    const [open, setOpen] = useState(false)
const [tourTypes]=useUpdateTourTypesMutation()

    const form = useForm({
        resolver: zodResolver(UpdateTourTypeSchema),
        defaultValues: {
            name: "",

        }

    })



    const onSubmit = async (info: z.infer<typeof UpdateTourTypeSchema>) => {
        console.log(info);

        const res = await tourTypes({id,info})
        console.log(res);
        // if (res?.data?.success) {
        //     toast.success("Tour Type Added")
        //     setOpen(false)
        // }
        // else {
        //     toast.error(res?.error?.data?.message)
        // }

    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button size="sm" className="bg-yellow-500 hover:bg-yellow-500 text-right" ><FaRegEdit /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Tour Type</DialogTitle>
                        <DialogDescription>
                            Update the tour type for travel management system. Click Add  when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form id="update-tourType-division" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tour Type Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Tour Type Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </form>
                    </Form>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button form="update-tourType-division" type="submit">Update Tour Type</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
