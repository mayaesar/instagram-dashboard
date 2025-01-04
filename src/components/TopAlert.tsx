'use client'
import {Alert, Button} from "@nextui-org/react";
import {useState} from "react";


export default function TopAlert(){
    const [isVisible, setIsVisible] = useState(true);
    return (
        <div className="flex items-center justify-center w-full">
            {isVisible ? (
                <Alert color="warning"
                       variant="faded"
                       title="Note:"
                       description="Any data you upload will not be saved and discarded once you exit or reload the site."
                       onClose={() => setIsVisible(false)}
                       />
            ):(
                <Button variant="faded" color="warning" onPress={() => setIsVisible(true)}>
                    Open Alert
                </Button>
            )
            }
        </div>

    )
}