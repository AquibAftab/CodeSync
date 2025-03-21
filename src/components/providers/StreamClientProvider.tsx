"use client";
import { ReactNode, useEffect, useState } from "react";
import { streamTokenProvider } from "@/actions/stream.action";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import LoaderUI from "../LoaderUI";

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
    const [streamClient, setStreamClient] = useState<StreamVideoClient | null>(null);
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (!isLoaded || !user) return;

        const client = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
            user: {
                id: user.id,
                name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.id,
                image: user.imageUrl,
            },
            tokenProvider: () => streamTokenProvider(user.id),
        });

        setStreamClient(client);
    }, [isLoaded, user]);

    if (!streamClient) return <LoaderUI />;

    return <StreamVideo client={streamClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
