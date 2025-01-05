import {atom, useAtom} from "jotai";
import liked_posts from "@/mocks/instagram-data/your_instagram_activity/likes/liked_posts.json"
import insight from "@/mocks/instagram-data/logged_information/past_instagram_insights/audience_insights.json"
import profileImg from "@/mocks/instagram-data/media/profile/202408/457742621_1623914194834633_5168724281180364414_n_18136753804356985.jpg"
import info from "@/mocks/instagram-data/personal_information/personal_information/personal_information.json"
import saved_posts from "@/mocks/instagram-data/your_instagram_activity/saved/saved_posts.json"
import posts from "@/mocks/instagram-data/logged_information/past_instagram_insights/posts.json"
import reels from "@/mocks/instagram-data/logged_information/past_instagram_insights/reels.json"
import profile_photos from "@/mocks/instagram-data/your_instagram_activity/content/profile_photos.json"

import JSZip from "jszip";
import {StaticImageData} from "next/image";

export const likedPostsAtom = atom(liked_posts.likes_media_likes);
export const savedPostsAtom = atom(saved_posts.saved_saved_media);
export const insightAtom = atom(insight.organic_insights_audience[0].string_map_data);
export const profileImgAtom = atom<StaticImageData | string>(profileImg);
export const personalInfoAtom = atom(info.profile_user[0].string_map_data);
export const postsAtom = atom(posts.organic_insights_posts);
export const reelsAtom = atom(reels.organic_insights_reels);
export const profilePhotosAtom = atom(profile_photos.ig_profile_picture);

export const useInstagramData = () => {
    const [, setLikedPosts] = useAtom(likedPostsAtom);
    const [, setSavedPosts] = useAtom(savedPostsAtom);
    const [, setInsight] = useAtom(insightAtom);
    const [, setProfileImage] = useAtom(profileImgAtom);
    const [, setPosts] = useAtom(postsAtom);
    const [, setReels] = useAtom(reelsAtom);
    const [, setProfilePhotos] = useAtom(profilePhotosAtom);

    const readFile = async (zip: JSZip, path: string, type: "text" | "blob") => {
        const rootDirectory = Object.keys(zip.files)[0].split("/")[0];
        const json = zip.file(`${rootDirectory}/${path}`) || zip.file(path);

        if (!json) {
            console.warn(`File not found: ${path}.`);
            return null;
        }

        return json.async(type);
    }

    const readFileJSON = async (zip: JSZip, path: string) => {
        const content = await readFile(zip, path, "text") as string;
        return content ? JSON.parse(content) : null;
    }

    const readFileImage = async (zip: JSZip, path: string) => {
        const content = await readFile(zip, path, "blob") as Blob;
        return content ? URL.createObjectURL(new Blob([content])) : null;
    }

    const loadFromZip = async (file: File) => {
        const zip = await JSZip.loadAsync(file);
        try {
            const mediaLikes = (await readFileJSON(zip, "your_instagram_activity/likes/liked_posts.json"))?.likes_media_likes;
            setLikedPosts(mediaLikes ?? []);

            const _insight = (await readFileJSON(zip, "logged_information/past_instagram_insights/audience_insights.json"))?.organic_insights_audience?.[0]?.string_map_data;
            setInsight(_insight ?? []);

            const _savedPosts = (await readFileJSON(zip, "your_instagram_activity/saved/saved_posts.json"))?.saved_saved_media;
            setSavedPosts(_savedPosts ?? []);

            const _posts = (await readFileJSON(zip, "logged_information/past_instagram_insights/posts.json"))?.organic_insights_posts;
            setPosts(_posts ?? []);

            const _reels = (await readFileJSON(zip, "logged_information/past_instagram_insights/reels.json"))?.organic_insights_reels;
            setReels(_reels ?? []);

            const _profilePhotos = (await readFileJSON(zip, "your_instagram_activity/content/profile_photos.json"))?.ig_profile_picture;
            setProfilePhotos(_profilePhotos ?? []);
            const [profilePhoto] = _profilePhotos;

            const profileImage = await readFileImage(zip, profilePhoto.uri);
            setProfileImage(profileImage ?? "");
        } catch (e) {
            console.error(e)
        }
    }
    return {
        loadFromZip,
    };
}