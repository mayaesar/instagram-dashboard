'use client'

import {useAtom} from "jotai/index";
import {reelsAtom} from "@/stores";
import {Chip} from "@nextui-org/chip";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import dayjs from "dayjs";
import {Pagination} from "@nextui-org/pagination";
import {useState} from "react";

export default function ReelsTable() {
  const [reels] = useAtom(reelsAtom);

  const [page, setPage] = useState(1);
  const perPage = 10;
  const pages = Math.ceil(reels.length / perPage);

  const reelsPaginated = reels.slice((page - 1) * perPage, page * perPage);

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
            <span className="text-white text-lg font-semibold">Reels</span>
            <Chip color="default" size="sm">{reels.length}</Chip>
          </div>
          <Table
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="secondary"
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
              <TableColumn>PLAYS</TableColumn>
              <TableColumn>ACCOUNTS REACHED</TableColumn>
              <TableColumn>CREATED AT</TableColumn>
            </TableHeader>
            <TableBody>
              {
                reelsPaginated.map((reel, index) => (
                    <TableRow key={index}>
                      <TableCell className="!truncate max-w-80">
                        {decode(reel.media_map_data["Media Thumbnail"].title)}
                      </TableCell>
                      <TableCell>{reel.string_map_data["Instagram Likes"].value}</TableCell>
                      <TableCell>{reel.string_map_data["Instagram Comments"].value}</TableCell>
                      <TableCell>{reel.string_map_data["Instagram Shares"].value}</TableCell>
                      <TableCell>{reel.string_map_data["Instagram Saves"].value}</TableCell>
                      <TableCell>{reel.string_map_data["Instagram Plays"].value}</TableCell>
                      <TableCell>{reel.string_map_data["Accounts reached"].value}</TableCell>
                      <TableCell>{dayjs.unix(reel.string_map_data["Upload Timestamp"].timestamp).format("D MMM YYYY")}</TableCell>
                    </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </section>
  );
}