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
import { useAddTourMutation } from "@/redux/features/Tour/tour.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"

const AddTourTypeSchema = z.object({
    name: z.string().min(3, { error: "Tour type name minimum 3 charecter" }).max(50),

})

export function AddTourTypeModal() {

    const [addTourType] = useAddTourMutation()

    const form = useForm({
        resolver: zodResolver(AddTourTypeSchema),
        defaultValues: {
            name: ""
        }

    })
    const onSubmit = async (info:z.infer<typeof AddTourTypeSchema>) => {

        const res = await addTourType(info)
        if (res?.data?.success) {
            toast.success("Tour Type Added")
        }
        else {
            toast.error(res?.error?.data.message)
        }

    }
    return (
        <Dialog>
            <form >
                <DialogTrigger asChild>
                    <Button className="bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-600 text-white hover:bg-teal-600 hover:text-white" variant="outline">Add Tour Type</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Tour Type</DialogTitle>
                        <DialogDescription>
                            Add the division for travel management system. Click Add Division when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
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
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                         <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button form="add-tour-type" type="submit">Add Tour Type</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
