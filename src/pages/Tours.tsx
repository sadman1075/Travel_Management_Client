import { Button } from "@/components/ui/button";
import { useGetAllTourQuery } from "@/redux/features/Tour/tour.api";
import { Link } from "react-router";

const Tours = () => {
    const {data}=useGetAllTourQuery("")
    return (
        <div>
            <div className="container mx-auto px-5 py-8 grid grid-cols-12 gap-5">
                {/* <TourFilters /> */}
                <div className="col-span-12 lg:w-3/4 mx-auto">
                    {data?.data?.map((item) => (
                        <div
                            key={item.slug}
                            className="border border-muted rounded-lg shadow-md overflow-hidden mb-6 lg:flex"
                        >
                            <div className="lg:w-2/5 bg-red-500 flex-shrink-0">
                                <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    className="object-cover w-full h-full "
                                />
                            </div>
                            <div className="p-6 flex-1">
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground mb-3">{item.description}</p>
                                <p className="text-muted-foreground mb-3">{item.costFrom}</p>

                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-lg  font-bold text-orange-600">
                                        From ৳{item.costFrom}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Max {item.maxGuest} guests
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                    <div>
                                        <span className="font-medium">From:</span>{" "}
                                        {item.departureLocation}
                                    </div>
                                    <div>
                                        <span className="font-medium">To:</span>{" "}
                                        {item.arrivalLocation}
                                    </div>
                                    <div>
                                        <span className="font-medium">Duration:</span>{" "}
                                        {item.tourPlan.length} days
                                    </div>
                                    <div>
                                        <span className="font-medium">Min Age:</span> {item.minAge}+
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.amenities.slice(0, 3).map((amenity, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-muted/50 text-orange-600 text-xs font-bold rounded-full"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                    {item.amenities.length > 3 && (
                                        <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs  rounded-full">
                                            +{item.amenities.length - 3} more
                                        </span>
                                    )}
                                </div>

                                <Button asChild className="w-full bg-orange-600 text-white hover:bg-orange-600 ">
                                    <Link to={`/tour/${item._id}`}>View Details</Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tours;