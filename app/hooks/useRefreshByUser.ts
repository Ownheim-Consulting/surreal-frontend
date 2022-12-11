import { useState } from "react";

export function useRefreshByUser(refetch: () => Promise<unknown>) {
    const [isRefetchingByUser, setIsRefetchingByUser] = useState<boolean>(false);

    async function refetchByUser() {
        setIsRefetchingByUser(true);

        try {
            await refetch();
        } finally {
            setIsRefetchingByUser(false);
        }
    }

    return {
        isRefetchingByUser,
        refetchByUser,
    };
}
