import info from "@/mocks/instagram-data/personal_information/personal_information/personal_information.json"
import profileImg from "@/mocks/instagram-data/media/profile/202408/457742621_1623914194834633_5168724281180364414_n_18136753804356985.jpg"
import insight from "@/mocks/instagram-data/logged_information/past_instagram_insights/audience_insights.json"
import Image from "next/image";

export default function Hero() {
    const user = info.profile_user[0];
    const followers = insight.organic_insights_audience[0].string_map_data.Followers.value;

    return(
        <section className="py-4">
            <div className="flex items-center gap-4">
                <Image src={profileImg} alt="profile image" width={100} height={100}
                     className="rounded-full"/>
                <div>
                    <div className="text-2xl">{user.string_map_data.Name.value}</div>
                    <div className="text-gray-500">{followers} Followers</div>
                </div>

            </div>
        </section>
    )
}