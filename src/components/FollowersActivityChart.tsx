'use client'

import Chart from "@/components/Chart";
import {useAtom} from "jotai/index";
import {insightAtom} from "@/stores";

export default function FollowersActivityChart() {
    const [followData] = useAtom(insightAtom);

    const weeklyData = [
        followData["Sunday Follower Activity"].value,
        followData["Monday Follower Activity"].value,
        followData["Tuesday Follower Activity"].value,
        followData["Wednesday Follower Activity"].value,
        followData["Thursday Follower Activity"].value,
        followData["Friday Follower Activity"].value,
        followData["Saturday Follower Activity"].value
    ].map((item) => Number(item));

    return (
        <div className="bg-slate-800 rounded-md p-3">
            <p className="text-base">Followers Activity</p>
            <Chart
                options={{
                    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    series: [{
                        data: weeklyData,
                    }],
                    chart: {
                        type: 'bar',
                        height: 300
                    },
                }}
            />
        </div>
    )
}