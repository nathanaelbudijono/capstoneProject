import Typography from "@/components/core/typography";
import { DataTableBoatUser } from "@/modules/table/boat-user/data-table";
import { boatType, columns } from "@/modules/table/boat-user/columns";

const UserBoat = ({ boats }: { boats: boatType[] }) => {
  return (
    <main className={`${boats?.length % 5 === 0 ? "h-full" : "h-screen"}`}>
      <Typography variant="h3" color="primary">
        Boat Owned
      </Typography>
      <Typography variant="small" className="mt-2">
        List of boats owned or active.
      </Typography>
      <div className="container mx-auto py-5">
        <DataTableBoatUser columns={columns} data={boats} />
      </div>
    </main>
  );
};

export default UserBoat;
