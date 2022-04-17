import { TitleAndMetaTags, Container, Heading, Paragraph, Section } from '@design-system';
import { Layout } from '@components';

export default function Home() {
    return (
        <Layout >
            <TitleAndMetaTags title="404 Not Found | Scratch Auth" />
            <Section>
                <Container size="3">
                    <Heading
                        size="4"
                        css={{
                            mb: '$3',
                            '@initial': {
                                pr: 100,
                            },
                            '@bp2': {
                                ta: 'center',
                                px: 180,
                            },
                            '@bp3': {
                                px: 200,
                            },
                        }}
                    >
                        404 - Not Found
                    </Heading>
                    <Paragraph
                        size="2"
                        css={{
                            mb: '$6',
                            '@bp2': {
                                mx: 230,
                                ta: 'center',
                                mb: '$7',
                            },
                        }}
                    >
                        Oops, you've run into a non-existent page! What brought you here?
                    </Paragraph>
                </Container>
            </Section>
        </Layout>
    );
}
