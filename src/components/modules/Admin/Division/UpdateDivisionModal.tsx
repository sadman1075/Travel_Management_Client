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
import { useUpdateDivisionMutation } from "@/redux/features/Division/division.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FaRegEdit } from "react-icons/fa"
import z from "zod"

const UpdateDivisionSchema = z.object({
    name: z.string().min(3, { error: "Name is too short" }).max(50),
    description: z.string().min(5, { error: "Name is too short" }).max(150),


})

export function UpdateDivisionModal({id}) {
    
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState<File | null>(null)
    const [division] = useUpdateDivisionMutation()

    const form = useForm({
        resolver: zodResolver(UpdateDivisionSchema),
        defaultValues: {
            name: "",
            description: "",



        }

    })



    const onSubmit = async (data) => {
      
        const formData = new FormData();
        formData.append("data", JSON.stringify(data))
        formData.append("file", image as File)
        
       

        const res = await division({id,formData}).unwrap()
        console.log(res);
        toast.success("division updated successfully")
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button  size="sm" className="bg-yellow-500 hover:bg-yellow-500" ><FaRegEdit /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Division</DialogTitle>
                        <DialogDescription>
                            Update the division for travel management system. Click Add  when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form id="update-division" onSubmit={form.handleSubmit(onSubmit)}>
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
                        <Button form="update-division" type="submit">Update Division</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
