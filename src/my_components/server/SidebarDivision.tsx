import { memo } from "react";
import SidebarInfo from "./SidebarInfo";

interface ChannelResponseValue {
  _id: "TEXT" | "AUDIO" | "VIDEO";
  count: number;
  Channel_Info: {
    _id: string;
    name: string;
  }[];
}
function SidebarDivision({ _id, count, Channel_Info }: ChannelResponseValue) {
  return (
    <div className="w-full my-2">
      <h1 className="my-2">
        {_id} {count}
      </h1>
      {Channel_Info.map((info) => (
        <SidebarInfo _id={info._id} name={info.name} type={_id} />
      ))}
    </div>
  );
}

export default memo(SidebarDivision);
