import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CSSBaseline } from '@design-system';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: <>{initialProps.styles}</>,
        };
    }

    render() {
        return (
            <Html>
                <Head>
                    {CSSBaseline.flush()}
                    <script async src="https://arc.io/widget.min.js#Nz4SMqdh"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
