'use client'

import {Alert} from "@nextui-org/react";
import {useState} from "react";

export default function TopAlert(){
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="pt-6">
            <Alert
                color="warning"
                variant="faded"
                title="Note:"
                description="Any data you upload will not be saved and discarded once you exit or reload the site."
                onClose={() => setIsVisible(false)}
            />
        </div>
    );
}