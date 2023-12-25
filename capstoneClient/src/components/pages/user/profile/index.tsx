import { Button } from "@/components/buttons/button";
import Typography from "@/components/core/typography";
import { profileType } from "@/lib/slices/user-slices";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { validateUser } from "@/lib/validation/user-validation";

const UserProfile = ({ user }: { user: profileType | null }) => {
  return (
    <main className="h-screen max-sm:h-full">
      <section className="flex justify-between">
        <Typography variant="h3" color="primary">
          My Profile
        </Typography>
        <Button variant="default">
          <Link href={`${user?.data?.id}/edit`}>Edit Profile</Link>
        </Button>
      </section>
      <section className="mt-5">
        <div className="w-1/4">
          <img
            src="/images/empty-user.png"
            alt="Empty User"
            className="object-cover"
          />
        </div>
      </section>
      <section className="border-t-2 mt-5 pt-5 border-primary">
        <div className="px-4 py-2 border rounded-md shadow-lg bg-white ">
          <div>
            <Typography variant="h4" color="primary">
              Personal Information
            </Typography>
          </div>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 max-sm:gap-2 items-center overflow-auto">
            <Typography variant="small">First Name</Typography>
            <Typography variant="small">{user?.data?.firstName}</Typography>
            <Typography variant="small">Last Name</Typography>
            <Typography variant="small">{user?.data?.lastName}</Typography>
            <Typography variant="small">email</Typography>
            <Typography variant="small">{user?.data?.email}</Typography>
            <Typography variant="small">Date of Birth</Typography>
            <Typography variant="small">
              {user?.data?.DOB.substring(0, 10)}
            </Typography>
            <Typography variant="small">Phone Number</Typography>
            <Typography variant="small">{user?.data?.phoneNumber}</Typography>
            <Typography variant="small">City</Typography>
            <Typography variant="small">{user?.data?.city}</Typography>
            <Typography variant="small">Country</Typography>
            <Typography variant="small">{user?.data?.country}</Typography>
          </div>
        </div>
      </section>
    </main>
  );
};
export default UserProfile;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await validateUser(ctx);
}
