import Hero from "@/components/Hero";
import FollowerInsights from "@/components/FollowerInsights";

export default function Home() {
  return (
    <div className="max-w-[1300px] mx-auto px-4 text-gray-100">
      <Hero />
        <div className="flex">
            <div>
                <p className="text-2xl py-4">Followers Insight</p>
                <FollowerInsights />
            </div>


        </div>

    </div>
  );
}
