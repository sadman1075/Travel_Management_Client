import SingleImageUploader from "@/components/single-image-uploader"
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
import { Textarea } from "@/components/ui/textarea"
import { useAddDivisionMutation } from "@/redux/features/Division/division.api"
import type { IDivision } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"

const AddDivisionSchema = z.object({
    name: z.string().min(3, { error: "Name is too short" }).max(50),
    description: z.string().min(5, { error: "Name is too short" }).max(150),


})

export function AddDivisionModal() {
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState<File | null>(null)
    const [division] = useAddDivisionMutation()

    const form = useForm({
        resolver: zodResolver(AddDivisionSchema),
        defaultValues: {
            name: "",
            description: "",



        }

    })



    const onSubmit = async (data: Partial<IDivision>) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data))
        formData.append("file", image as File)

        const res = await division(formData).unwrap()
        console.log(res);
        toast.success("division added")
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button className="bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-600 text-white hover:bg-teal-600 hover:text-white" variant="outline">Add Division</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Division</DialogTitle>
                        <DialogDescription>
                            Add the division for travel management system. Click Add  when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form id="add-division" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Division Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Division Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <br />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Division Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Division Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </form>
                        <SingleImageUploader onChange={setImage}></SingleImageUploader>
                    </Form>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button form="add-division" type="submit">Add Division</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
