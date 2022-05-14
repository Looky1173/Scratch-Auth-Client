import useSWR from 'swr';

export default function useAccounts() {
    const { data: accounts, error, mutate: mutateAccounts } = useSWR('/api/auth/accounts');

    return { accounts, error, mutateAccounts };
}
