"use client"

import {useAtom} from "jotai";
import {insightAtom, personalInfoAtom, profileImgAtom} from "@/stores";
import Image from "next/image";
import {Button} from "@nextui-org/react";
import {useRef} from "react";
import {useInstagramData} from "@/stores";

export default function Hero() {
    const [insight] = useAtom(insightAtom);
    const [personalInfo] = useAtom(personalInfoAtom);
    const [profileImage] = useAtom(profileImgAtom);
    const followers = insight.Followers.value;

    const inputFile = useRef<HTMLInputElement>(null);
    const { loadFromZip } = useInstagramData();

    const loadFile = (file: File | undefined) => {
        if (!file) return;
        return loadFromZip(file);
    }

    return(
        <section className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
                <Image src={profileImage} alt="profile image" width={100} height={100}
                     className="rounded-full"/>
                <div>
                    <div className="text-2xl">{personalInfo.Name.value}</div>
                    <div className="text-gray-400">{followers} Followers</div>
                </div>
            </div>

            <div>
                <Button onPress={() => inputFile.current?.click()} color="primary">
                    Import data
                </Button>
                <input
                    ref={inputFile}
                    onChange={(e) => loadFile(e.target.files?.[0])}
                    type="file"
                    className="hidden"
                />
            </div>
        </section>
    )
}