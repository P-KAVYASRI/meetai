"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { NewMeetingDialog } from "./new-meeting-dialog";




export const MeetingsListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <>
            <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                   <div className="inline-block rounded-lg border border-lime-500 bg-lime-50 px-3 py-1.5">
    <h5 className="text-xl font-semibold ">
        My Meetings
    </h5>
</div>
                   <Button
    onClick={() => setIsDialogOpen(true)}
    className="gap-x-2 rounded-lg bg-lime-600 px-5 font-medium text-white shadow-sm transition-all hover:bg-lime-700 hover:shadow-md"
>
    <PlusIcon className="size-4" />
    New Meeting
</Button>

                </div>
                <div className="flex items-center justify-center-safe gap-x-2 p-2 font-bold text-emerald-700">
                    Create a new meeting
                </div>
            </div>
        </>
    );
};
