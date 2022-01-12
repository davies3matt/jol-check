import { Auth } from 'aws-amplify';
import React, {createContext, useState, useContext} from 'react';
import { Jol, useListJolsQuery } from '../generated/graphql';

interface ContextType {
    jols: any[],
    refetchJols: () => any
}

const DEFAULT_STATE:ContextType = {
    jols: [],
    refetchJols: () => null
};

export const UserContext = createContext<ContextType>(DEFAULT_STATE);
export const useUserContext = () => useContext(UserContext);

const UserProvider: React.FC = ({ children }) => {
    const [jols, updateJols] = useState(DEFAULT_STATE.jols);

    const { data, refetch } = useListJolsQuery({
        fetchPolicy: 'network-only'
    });

    React.useEffect(() => {
        console.log(data);
        if(data && data.listJols && data.listJols.items) {
            updateJols(data.listJols.items);
        }
    }, [data])

    const refetchJols = () => {
        refetch();
    }

    return (
        <UserContext.Provider value={{
            jols,
            refetchJols
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;