import './styles/global.css'
import Head from 'next/head'
import {AuthProvider} from '../contexts/authContext'
import {AtivosProvider} from '../contexts/ativosContext'
import {DoencasProvider} from '../contexts/problemsContext'

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <AtivosProvider>
                <DoencasProvider>
                    <Head>
                        <title>Activus</title>
                    </Head>
                    <Component {...pageProps} />
                </DoencasProvider>
            </AtivosProvider>
        </AuthProvider>
)}

export default MyApp