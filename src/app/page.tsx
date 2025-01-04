import Hero from "@/components/Hero";
import LikedPosts from "@/components/LikedPosts";
import PostsTable from "@/components/PostsTable";
import ReelsTable from "@/components/ReelsTable";
import AgeRangeChart from "@/components/AgeRangeChart";
import TopCitiesChart from "@/components/TopCitiesChart";
import TopCountriesChart from "@/components/TopCountriesChart";
import FollowersActivityChart from "@/components/FollowersActivityChart";
import TopAlert from "@/components/TopAlert";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-12 text-gray-100">
        <TopAlert />
        <Hero />
        <div className="grid grid-cols-12 items-start gap-4 mt-6">
            <div className="col-span-12 grid grid-cols-12 items-stretch gap-4">
                <div className="col-span-4 flex flex-col gap-4">
                    <AgeRangeChart />
                    <TopCitiesChart />
                    <TopCountriesChart />
                </div>
                <div className="col-span-8 flex flex-col gap-4">
                    <LikedPosts/>
                    <FollowersActivityChart/>
                </div>
            </div>
            <div className="col-span-12 flex flex-col gap-4">
            <PostsTable />
                <ReelsTable />
            </div>
        </div>
    </div>
  );
}
