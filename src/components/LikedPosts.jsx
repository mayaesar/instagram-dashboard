"use client"

import Chart from "./Chart";
import {useMemo} from "react";
import {useAtom} from "jotai";
import {likedPostsAtom, savedPostsAtom} from "@/stores";

export default function LikedPosts() {
    const [likedPosts] = useAtom(likedPostsAtom);
    const [savedPosts] = useAtom(savedPostsAtom);

    const likedTime = useMemo(() => {
        return likedPosts.map(post => {
            const postTime = post.string_list_data[0].timestamp;
            const date = new Date(postTime * 1000);

            return {
                month: date.getMonth(),
                hour: date.getHours()
            }
        });
    }, [likedPosts]);

    const savedTime = useMemo(() => {
        return savedPosts.map(post => {
            const postTime = post.string_map_data["Saved on"].timestamp;
            const date = new Date(postTime * 1000);

            return {
                month: date.getMonth(),
                hour: date.getHours()
            }
        });
    }, [savedPosts]);

    const likesPerMonth = useMemo(() => {
        const perMonths = [];
        for (let i = 0; i <= 11; i++) {
            perMonths.push(
                likedTime.filter(like => like.month === i).length
            )
        }

        return perMonths;
    }, [likedTime]);

    const savedPerMonth = useMemo(() => {
        const perMonths = [];
        for (let i = 0; i <= 11; i++) {
            perMonths.push(
                savedTime.filter(save => save.month === i).length
            )
        }

        return perMonths;
    }, [savedTime]);


    return(
        <section className="col-span-8">
            <div className="bg-slate-800 rounded-md p-3">
                <p className="text-base">Posts interactions</p>
                <Chart
                    options={{
                        series: [{
                            name: 'Liked posts per month',
                            type: 'column',
                            data: likesPerMonth,
                        },{
                            name: 'Saved posts per month',
                            type: 'line',
                            data: savedPerMonth,
                        }],
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        chart: {
                            height: 350,
                            type: 'line',
                        },
                        dataLabels: {
                            enabled: true,
                            enabledOnSeries: [1]
                        },
                        yaxis: [{
                            title: {
                                text: 'Liked posts',
                            },

                        }, {
                            opposite: true,
                            title: {
                                text: 'Saved posts'
                            }
                        }]
                    }} />
            </div>
        </section>

    )
}