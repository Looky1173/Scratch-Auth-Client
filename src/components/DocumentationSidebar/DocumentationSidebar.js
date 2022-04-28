import NextLink from 'next/link';
import { Badge, Box, Button, Card, Container, Flex, Link, Text, Heading, Separator, styled } from '@design-system';
import { useState, useEffect } from 'react';
//import { useRouter } from 'next/router';

const ArticleCard = styled(Card, {
    backgroundColor: '$card4',
    color: '$hiContrast',
    borderRadius: '$4',
    p: '$2',
    mb: '$2',
    width: '15rem',
    cursor: 'pointer',
    '&::before': {
        content: '',
        boxShadow: 'none !important',
    },
    '&:hover': {
        backgroundColor: '$card3',
    },

    variants: {
        variant: {
            active: {
                backgroundColor: '$accent10',
                color: '$loContrast',
                fontWeight: '$bold',
                '&:hover': {
                    backgroundColor: '$accent9',
                },
            },
        },
    },
});

const DocumentationSidebarContainer = styled(Box, {
    p: '$4',
    backgroundColor: '$card2',
    borderRadius: '$4 0 $4 0',
});

function DocumentationSidebar({ docs, order, currentSlug }) {
    //const router = useRouter();
    //const { slug } = router.query;

    return (
        <DocumentationSidebarContainer>
            <Heading as="h2" css={{ mb: '$1', color: '$neutral11' }}>
                Documentation
            </Heading>
            <Flex direction="column">
                {docs
                    .sort((a, b) => order.indexOf(a.frontMatter.slug) - order.indexOf(b.frontMatter.slug))
                    .map((article, index) => (
                        <NextLink href={`/documentation/${article.slug}`}>
                            <ArticleCard key={index} variant={currentSlug === article.slug ? 'active' : null}>
                                {article.frontMatter.title}
                            </ArticleCard>
                        </NextLink>
                    ))}
            </Flex>
        </DocumentationSidebarContainer>
    );
}

export default DocumentationSidebar;
