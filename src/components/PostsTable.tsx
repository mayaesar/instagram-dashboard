'use client'

import {useAtom} from "jotai";
import {postsAtom} from "@/stores";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import dayjs from "dayjs";
import {Chip} from "@nextui-org/chip";
import {useState} from "react";
import {Pagination} from "@nextui-org/pagination";

export default function PostsTable() {
    const [posts] = useAtom(postsAtom);

    if (posts == null) {
        return <div>Data not available.</div>;
    }

    const [page, setPage] = useState(1);
    const perPage = 10;
    const pages = Math.ceil(posts.length / perPage);

    const postsPaginated = posts.slice((page - 1) * perPage, page * perPage);

    const decode = (str: string) => {
        const utf8decoder = new TextDecoder("utf-8");
        const bytes = new Uint8Array(str.split('')
            .map(char => char.charCodeAt(0)));
        return utf8decoder.decode(bytes);
    }

    return (
        <section className="w-full">
            <div className="bg-slate-800 rounded-md p-3">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-white text-lg font-semibold">Posts</span>
                    <Chip color="default" size="sm">{posts.length}</Chip>
                </div>
                <Table
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="warning"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                >
                    <TableHeader>
                        <TableColumn>TITLE</TableColumn>
                        <TableColumn>LIKES</TableColumn>
                        <TableColumn>COMMENTS</TableColumn>
                        <TableColumn>SHARES</TableColumn>
                        <TableColumn>SAVES</TableColumn>
                        <TableColumn>PROFILE VISITS</TableColumn>
                        <TableColumn>IMPRESSIONS</TableColumn>
                        <TableColumn>FOLLOWS</TableColumn>
                        <TableColumn>ACCOUNTS REACHED</TableColumn>
                        <TableColumn>CREATED AT</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {
                            postsPaginated.map((post, index) => (
                                <TableRow key={index}>
                                    <TableCell className="!truncate max-w-80">
                                        {decode(post.media_map_data["Media Thumbnail"].title)}
                                    </TableCell>
                                    <TableCell>{post.string_map_data.Likes.value}</TableCell>
                                    <TableCell>{post.string_map_data.Comments.value}</TableCell>
                                    <TableCell>{post.string_map_data.Shares.value}</TableCell>
                                    <TableCell>{post.string_map_data.Saves.value}</TableCell>
                                    <TableCell>{post.string_map_data["Profile visits"].value}</TableCell>
                                    <TableCell>{post.string_map_data.Impressions.value}</TableCell>
                                    <TableCell>{post.string_map_data.Follows.value}</TableCell>
                                    <TableCell>{post.string_map_data["Accounts reached"].value}</TableCell>
                                    <TableCell>{dayjs.unix(post.string_map_data["Creation Timestamp"].timestamp).format("D MMM YYYY")}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}