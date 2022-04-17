import { Box, Button, Flex, TitleAndMetaTags } from '@design-system';
import { Layout, Hero } from '@components';
import NextLink from 'next/link';

export default function Home() {
    return (
        <Layout>
            <TitleAndMetaTags title="Scratch Auth" />
            <Hero />
        </Layout>
    );
}
