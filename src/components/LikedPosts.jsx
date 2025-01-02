import Chart from "./Chart";
import liked_posts from "@/mocks/instagram-data/your_instagram_activity/likes/liked_posts.json"
import {useMemo} from "react";

export default function LikedPosts() {
    const likedTime = useMemo(() => {
        const posts = liked_posts.likes_media_likes;

        return posts.map(post => {
            const postTime = post.string_list_data[0].timestamp;
            const date = new Date(postTime * 1000);

            return {
                date: date.getDate(),
                month: date.getMonth(),
                hour: date.getHours()
            }
        });
    }, []);

    const likesPerMonth = useMemo(() => {
        const perMonths = [];
        for (let i = 0; i <= 11; i++) {
            perMonths.push(
                likedTime.filter(like => like.month === i).length
            )
        }

        return perMonths;
    }, []);


    return(
        <section className="col-span-8">
            <div className="bg-slate-800 rounded-md p-3">
                <p className="text-base">Liked Posts</p>
                <Chart
                    options={{
                        series: [{
                            name: 'Likes per month',
                            type: 'column',
                            data: likesPerMonth,
                        }],
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        chart: {
                            height: 350,
                            type: 'line',
                        },
                    }} />
            </div>
        </section>

    )
}