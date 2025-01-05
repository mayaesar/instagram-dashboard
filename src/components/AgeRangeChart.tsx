'use client'

import Chart from "@/components/Chart";
import {useAtom} from "jotai/index";
import {insightAtom} from "@/stores";

export default function AgeRangeChart() {
    const [followData] = useAtom(insightAtom);


    const dataParser = (data: string) => {
        return data.split(", ").reduce((acc, item) => {
            const [group, percentage] = item.split(": ");
            acc.labels.push(group.trim());
            acc.series.push(parseFloat(percentage.replace("%", "")));
            return acc;
        }, { labels: [], series: [] } as { labels: string[], series: number[] });
    };

    if (!followData["Follower Percentage by Age for All Genders"]) {
        return <div>Data not available.</div>;
    }

    const ageData = dataParser(followData["Follower Percentage by Age for All Genders"].value);

    return (
        <div className="flex-1 bg-slate-800 rounded-md p-3">
            <p className="text-base">Age Range</p>
            <Chart
                options={{
                    labels: ageData.labels,
                    series: ageData.series,
                    chart: {
                        type: 'donut',
                        height: 200
                    },
                }}
            />
        </div>
    )
}