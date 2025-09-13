import { useDeleteTourTypesMutation, useGetTourTypesQuery } from "@/redux/features/Tour/tour.api";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import Swal from "sweetalert2"
import type { ITourType } from "@/types";
import { UpdateTourTypeModal } from "@/components/modules/Admin/TourType/UpdateTourTypeModal";
const AddTourType = () => {
    const { data } = useGetTourTypesQuery(undefined)
    const tourTypes = data?.data?.data;

    const [deleteTourTypes] = useDeleteTourTypesMutation()

    const handleDelete = async (tourType: ITourType) => {

        Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert ${tourType.name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                await deleteTourTypes(tourType._id)



                Swal.fire({
                    title: "Deleted!",
                    text: "Your selected tour type is deleted.",
                    icon: "success"
                });
            }

        });

    }
    return (
        <div className="lg:mx-5">
            <div className="mb-7 flex justify-between items-center">
                <p className="text-xl lg:text-2xl text-teal-600  font-bold">TOUR TYPES</p>
                <AddTourTypeModal></AddTourTypeModal>
            </div>

            <div className="border border-muted rounded-md">
                <Table className="max-w-7xl mx-auto border-2 rounded-xl">
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader className="bg-gray-200">
                        <TableRow>
                            <TableHead className="w-full">Name</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            tourTypes?.map((tourType: { name: string, _id: string }) => <>
                                <TableRow>
                                    <TableCell className="font-medium">{tourType.name}</TableCell>
                                    <TableCell className="font-medium  flex gap-2">

                                        <Button onClick={() => handleDelete(tourType)} size="sm" className="bg-red-600 hover:bg-red-600  "><Trash2></Trash2></Button>


                                        <UpdateTourTypeModal id={tourType._id}></UpdateTourTypeModal>




                                    </TableCell>
                                </TableRow>
                            </>)
                        }
                    </TableBody>
                </Table>

            </div>
        </div>
    );
};

export default AddTourType;