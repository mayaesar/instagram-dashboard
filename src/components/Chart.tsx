'use client'

import ApexCharts from 'apexcharts'
import {useEffect, useRef} from "react";
import {merge} from "ts-deepmerge";

type Props = {
    options: ApexCharts.ApexOptions
};

const defaultOptions: Partial<ApexCharts.ApexOptions> = {
    theme: {
        mode: "dark",
    },
    chart: {
        background: "none"
    },
    colors: ["#ff0054", "#ffbd00", "#ff5400", "#390099", "#9e0059"],
    stroke: {
        colors: undefined,
    }
};

export default function Chart({ options }: Props) {
    const element = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let chart: ApexCharts | null = null;

        import("apexcharts")
            .then(({ default: ApexCharts }) => {
                chart = new ApexCharts(element.current, merge(defaultOptions, options));
                chart.render();
            });

        return () => {
            chart?.destroy();
        };
    }, [options]);

    return(
        <div ref={element} />
    )
}

