'use client'

import Chart from "@/components/Chart";
import {useAtom} from "jotai/index";
import {insightAtom} from "@/stores";

export default function TopCountriesChart() {
    const [followData] = useAtom(insightAtom);

    const dataParser = (data: string) => {
        return data.split(", ").reduce((acc, item) => {
            const [group, percentage] = item.split(": ");
            acc.labels.push(group.trim());
            acc.series.push(parseFloat(percentage.replace("%", "")));
            return acc;
        }, { labels: [], series: [] } as { labels: string[], series: number[] });
    };

    const countryData = dataParser(followData["Follower Percentage by Country"].value);

    return (
        <div className="bg-slate-800 rounded-md p-3">
            <p className="text-base">Top Countries</p>
            <Chart
                options={{
                    labels: countryData.labels,
                    series: countryData.series,
                    chart: {
                        type: 'donut',
                        height: 200
                    }
                }}
            />
        </div>
    )
}