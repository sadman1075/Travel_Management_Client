import { AddDivisionModal } from "@/components/modules/Admin/Division/AddDivisionModal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useDeleteDivisionMutation, useGetDivisionQuery } from "@/redux/features/Division/division.api";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { UpdateDivisionModal } from "@/components/modules/Admin/Division/UpdateDivisionModal";

const AddDivision = () => {

    const { data } = useGetDivisionQuery(undefined)
    const divisions = data?.data;
    const [deleteDivision] = useDeleteDivisionMutation()


    const handleDelete = async (division) => {

        Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert ${division.name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                await deleteDivision(division._id)


                Swal.fire({
                    title: "Deleted!",
                    text: "Your selected division is deleted.",
                    icon: "success"
                });
            }

        });

    }

    return (
        <div className="lg:mx-5">
            <div className="mb-7 flex justify-between items-center">
                <p className="text-xl lg:text-2xl text-teal-600  font-bold">DIVISION</p>
                <AddDivisionModal></AddDivisionModal>
            </div>
            <Table className="max-w-7xl mx-auto border-2 rounded-xl">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader className="bg-gray-200">
                    <TableRow className=" justify-between">
                        <TableHead className="">Division Name</TableHead>
                        <TableHead className="">Slug</TableHead>
                        <TableHead className="">thumbnil</TableHead>
                        <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        divisions?.map((division) => <>
                            <TableRow>
                                <TableCell className="font-medium">{division.name}</TableCell>
                                <TableCell className="font-medium">{division.slug}</TableCell>
                                <TableCell className="font-medium ">
                                    <Avatar className="rounded-lg ">
                                        <AvatarImage
                                            src={division.thumbnail}
                                            alt="@evilrabbit"
                                        />
                                    </Avatar>
                                </TableCell>
                                <TableCell className=" flex gap-2">
                                    
                                
                                            <Button onClick={() => handleDelete(division)} size="sm" className="bg-red-600 hover:bg-red-600"><Trash2></Trash2></Button>

                                       
                                            <UpdateDivisionModal id={division._id}></UpdateDivisionModal>

                                     
                                </TableCell>
                            </TableRow>
                        </>)
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default AddDivision;