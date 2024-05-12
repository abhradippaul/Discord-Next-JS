import ActionTooltip from "@/components/Action-tooltip";
import Link from "next/link";
import { memo } from "react";

function EachServerElement({
  _id,
  name,
  serverId,
  imageUrl,
}: {
  _id: string;
  name: string;
  serverId: string;
  imageUrl: string;
}) {
  return (
    <div
      key={_id}
      className="w-full relative z-50 my-4 flex items-center justify-center group"
    >
      <div
        className={`absolute left-0 w-1 bg-white ${
          serverId === _id
            ? "top-0 bottom-0 rounded-md"
            : "top-[45%] bottom-[35%] rounded-full transition-[top,bottom] delay-100 group-hover:top-0 group-hover:bottom-0"
        }`}
      ></div>
      <ActionTooltip label={name} align="center" side="right">
        <Link href={`/servers/${_id}`}>
          <img
            src={`${imageUrl}`}
            alt="image"
            className={`rounded-full size-12 object-cover ${
              serverId !== _id && "hover:rounded-lg transition-[border-radius]"
            }`}
          />
        </Link>
      </ActionTooltip>
    </div>
  );
}

export default memo(EachServerElement);
