import { useEffect, useState } from "react";

export default function UserItem () {
    const [data, setData] = useState();

    useEffect(() => {
        setData()
        console.log(data, "user data");
    }, []);

    return <div className="flex items-center justify-between gap-2 border rounded-[8px] p-2">
        <div className="avatar rounded-full min-h-10 min-w-10 bg-emerald-500 text-white font-[700] flex items-center justify-center">
            <p className="uppercase">{data?.name.split("")[0]}{data?.name.split("")[1]}</p>
        </div>
        <div className="grow">
            <p className="text-[16px] font-bold capitalize">{data?.name}</p>
            <p className="text-[12px] text-neutral-500 w-[151px] truncate">{data?.email}</p>
        </div>
    </div>;
}