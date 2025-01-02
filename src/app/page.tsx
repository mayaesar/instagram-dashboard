import Hero from "@/components/Hero";
import FollowerInsights from "@/components/FollowerInsights";
import LikedPosts from "@/components/LikedPosts";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-100">
      <Hero />
        <div className="grid grid-cols-12 gap-4">
            <FollowerInsights />
            <LikedPosts />
        </div>
    </div>
  );
}
