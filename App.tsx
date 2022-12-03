import React, { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import NavigationTabs from "./app/screens/NavigationTabs";

const queryClient = new QueryClient();

function App(): ReactElement {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationTabs />
        </QueryClientProvider>
    );
}

export default App;
