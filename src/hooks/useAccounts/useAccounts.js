import useSWR from 'swr';

export default function useAccounts() {
    const { data: accounts, mutate: mutateAccounts } = useSWR('/api/auth/accounts');

    return { accounts, mutateAccounts };
}
