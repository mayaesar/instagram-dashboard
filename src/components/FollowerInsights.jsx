import Chart from "@/components/Chart";
import insight from "@/mocks/instagram-data/logged_information/past_instagram_insights/audience_insights.json"

export default function FollowerInsights() {

    const followData = insight.organic_insights_audience[0].string_map_data;
    const color = "rgb(243 244 246 / var(--tw-text-opacity, 1))"

    const dataParser = (data) => {
        return data.split(", ").reduce((acc, item) => {
            const [group, percentage] = item.split(": ");
            acc.labels.push(group.trim());
            acc.series.push(parseFloat(percentage.replace("%", "")));
            return acc;
        }, { labels: [], series: [] });
    };

    const ageData = dataParser(followData["Follower Percentage by Age for All Genders"].value);
    const cityData = dataParser(followData["Follower Percentage by City"].value);
    const countryData = dataParser(followData["Follower Percentage by Country"].value);
    const weeklyData = [followData["Sunday Follower Activity"].value, followData["Monday Follower Activity"].value, followData["Tuesday Follower Activity"].value, followData["Wednesday Follower Activity"].value, followData["Thursday Follower Activity"].value, followData["Friday Follower Activity"].value, followData["Saturday Follower Activity"].value ]

    return(
        <section className="col-span-4 grid grid-cols-1 gap-4">
            <div className="bg-slate-800 rounded-md p-3">
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
            <div className="bg-slate-800 rounded-md p-3">
                <p className="text-base">Top Cities</p>
                <Chart
                    options={{
                        labels: cityData.labels,
                        series: cityData.series,
                        chart: {
                            type: 'donut',
                            height: 200
                        }
                    }}
                />
            </div>
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
        </section>
    )
}