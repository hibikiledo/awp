import Head from 'next/head'
import Link from 'next/link'
export default ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <script></script>
    </Head>
    <header>
      <nav></nav>
    </header>
    {children}
  </div>
)
