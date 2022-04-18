import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { Layout, DocumentationSidebar } from '@components';
import { Box, Badge, Button, Flex, Heading, Link, Container, Paragraph, Separator, styled } from '@design-system';

import Highlight, { defaultProps } from 'prism-react-renderer';
import lightCodeTheme from 'prism-react-renderer/themes/vsLight';
import darkCodeTheme from 'prism-react-renderer/themes/vsDark';
import { useTheme } from '@hooks';

const HighlightWrapper = styled('pre', {
    p: '$4',
    bblr: '$4',
    bbrr: '$4',
});

const HighlightLanguage = styled('div', {
    px: '$4',
    py: '$2',
    btlr: '$4',
    btrr: '$4',
    backgroundColor: '$neutral4',
    color: '$hiContrast',
    textAlign: 'right',
    fontWeight: '$bold'
});

const HighlightLine = styled('div', {
    display: 'table-row',
});

const HighlightLineNo = styled('span', {
    display: 'table-cell',
    textAlign: 'right',
    paddingRight: '1em',
    userSelect: 'none',
    opacity: '0.5',
});

const SyntaxHighlighter = ({ children, ...props }) => {
    const code = children.props.children;
    const language = children.props.className?.replace('language-', '').trim();
    const { isDark } = useTheme();

    return (
        <Highlight {...defaultProps} code={code} theme={isDark ? darkCodeTheme : lightCodeTheme} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <>
                    <HighlightLanguage>{language ? language.toUpperCase() : 'TEXT'}</HighlightLanguage>
                    <HighlightWrapper className={className} style={{ ...style }}>
                        {tokens.slice(0, -1).map((line, i) => (
                            <HighlightLine key={i} {...getLineProps({ line, key: i })}>
                                <HighlightLineNo>{i + 1}</HighlightLineNo>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token, key })} />
                                ))}
                            </HighlightLine>
                        ))}
                    </HighlightWrapper>
                </>
            )}
        </Highlight>
    );
};

const Post = ({ frontMatter, slug, mdxSource, docs }) => {
    const components = {
        Badge,
        Box,
        Button,
        h1: (props) => <Heading as="h1" size="4" {...props} />,
        h2: (props) => <Heading as="h2" size="3" {...props} />,
        h3: (props) => <Heading as="h3" size="2" {...props} />,
        h4: (props) => <Heading as="h4" size="1" {...props} />,
        h5: (props) => <Heading as="h5" {...props} />,
        h6: (props) => <Heading as="h6" {...props} />,
        a: (props) => <Link {...props} />,
        p: (props) => <Paragraph {...props} />,
        hr: (props) => <Separator size="2" css={{ my: '$4' }} {...props} />,
        code: (props) => <Box as="code" css={{ py: '$1', px: '$2', borderRadius: '$pill', backgroundColor: '$neutral4' }} {...props} />,
        pre: (props) => <SyntaxHighlighter {...props} />,
    };

    return (
        <Layout>
            <Flex direction={{ '@initial': 'column', '@bp2': 'row' }}>
                <DocumentationSidebar docs={docs} currentSlug={slug} />
                <Box css={{ p: '$4' }}>
                    <Heading as="h2" size="3" css={{color: '$accent10', fontWeight: '$bold'}}>
                        {frontMatter.title}
                    </Heading>
                    <MDXRemote {...mdxSource} components={components} />
                </Box>
            </Flex>
        </Layout>
    );
};

export default Post;

export async function getStaticPaths() {
    // Read the files inside the src/docs dir
    const files = fs.readdirSync(path.join('src/docs'));

    // Generate path for each file
    const paths = files.map((file) => {
        return {
            params: {
                slug: file.replace('.mdx', ''),
            },
        };
    });

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    // read each file
    const markdown = fs.readFileSync(path.join('src/docs', slug + '.mdx'), 'utf-8');

    // Extract front matter
    const { data: frontMatter, content } = matter(markdown);

    const mdxSource = await serialize(content);

    // Read the src/docs dir
    let files = fs.readdirSync(path.join('src/docs'));

    // Get only the mdx files
    files = files.filter((file) => file.split('.')[1] === 'mdx');

    // Read each file and extract front matter
    const docs = await Promise.all(
        files.map((file) => {
            const mdWithData = fs.readFileSync(path.join('src/docs', file), 'utf-8');

            const { data: frontMatter } = matter(mdWithData);

            return {
                frontMatter,
                slug: file.split('.')[0],
            };
        }),
    );

    return {
        props: {
            frontMatter,
            slug,
            mdxSource,
            docs,
        },
    };
}
