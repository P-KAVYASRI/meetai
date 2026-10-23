"use client";

import { useState } from "react";
import { PlusIcon, XCircleIcon } from "lucide-react";

import { DEFAULT_PAGE } from "@/constants";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";






export const MeetingsListHeader = () => {
    const [filters, setFilters]=useMeetingsFilters();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isAnyFilterModified = 
    !!filters.status || !!filters.search || !!filters.agentId;

    const onClearFilters=()=>
    {
        setFilters({
        status: null,
        agentId: "",
        search:"",
        page: DEFAULT_PAGE,
    });
};

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
                <ScrollArea>
                <div className="flex items-center gap-x-2 p-2 ">
                     <MeetingsSearchFilter/>
                     <StatusFilter/>
                     <AgentIdFilter/>
                     {isAnyFilterModified && (
                         <Button
                          variant="outline" 
                          onClick={onClearFilters}
                         > 
                         <XCircleIcon 
                         className="size-4" 
                         /> 
                         Clear
                        </Button> 
                    )}
                </div>
                <ScrollBar orientation="horizontal"/>
                </ScrollArea>
            </div>
        </>
    );
};
