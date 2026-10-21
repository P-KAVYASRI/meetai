"use client";

import { toast } from "sonner";
import { useState } from "react";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Badge } from "@/components/ui/badge";
import { useConfirm } from "@/hooks/use-confirm";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { GeneratedAvatar } from "@/components/generated-avatar";

import { UpdateAgentDialog } from "../components/update-agent-dialog";
import { AgentIdViewHeader } from "../components/agent-id-view-header";

interface Props {
    agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [updateAgentDialogOpen, setUpdateAgentDialogOpen] =
        useState(false);

    const { data } = useSuspenseQuery(
        trpc.agents.getOne.queryOptions({ id: agentId })
    );

    const removeAgent = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({})
                );

                router.push("/agents");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        })
    );

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure?",
        `The following action will remove ${data.meetingCount} associated meetings.`
    );

    const handleRemoveAgent = async () => {
        const ok = await confirmRemove();

        if (!ok) return;

        await removeAgent.mutateAsync({ id: agentId });
    };

    return (
        <>
            {/* Remove Confirmation Dialog */}
            <RemoveConfirmation />

            {/* Update Agent Dialog */}
            <UpdateAgentDialog
                open={updateAgentDialogOpen}
                onOpenChange={setUpdateAgentDialogOpen}
                initialValues={data}
            />

            <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
                {/* Header */}
                <AgentIdViewHeader
                    agentId={agentId}
                    agentName={data.name}
                    onEdit={() => setUpdateAgentDialogOpen(true)}
                    onRemove={handleRemoveAgent}
                />

                {/* Agent Details Card */}
                <div className="rounded-lg border bg-white">
                    <div className="flex flex-col gap-y-4 p-5">
                        {/* Avatar and Name */}
                        <div className="flex items-center gap-x-3">
                            <GeneratedAvatar
                                variant="botttsNeutral"
                                seed={data.name}
                                className="size-12"
                            />

                            <h2 className="text-2xl font-medium">
                                {data.name}
                            </h2>
                        </div>

                        {/* Meeting Count */}
                        <Badge
                            variant="outline"
                            className="flex w-fit items-center gap-x-2 [&>svg]:size-4"
                        >
                            <VideoIcon className="text-blue-700" />

                            {data.meetingCount}{" "}
                            {data.meetingCount === 1
                                ? "meeting"
                                : "meetings"}
                        </Badge>

                        {/* Instructions */}
                        <div className="flex flex-col gap-y-3">
                            <p className="text-lg font-medium">
                                Instructions
                            </p>

                            <p className="text-neutral-800">
                                {data.instructions}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const AgentIdViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agent"
            description="This may take a few seconds, please wait..."
        />
    );
};

export const AgentIdViewError = () => {
    return (
        <ErrorState
            title="Error Loading Agent"
            description="Something went wrong while loading the agent. Please try again later."
        />
    );
};
//7:37:18