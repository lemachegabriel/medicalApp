import styles from './styles/teste.module.css'
export default function teste2(){
    

    return(
        <>
            
            <header>
                <div className={styles.bottomHalf}>
                    <img className={styles.logo} src='/img/logo.svg'/>
                    <div className={styles.menuHeader}>
                        <a>Login</a>
                    </div>
                </div>
            </header>
                <div className={styles.containerVideo}>
                    <video className={styles.videoBG} poster='img/poster.png' autoPlay muted loop>
                        <source src='video/Backvideo Adobecreativecloudexpress-1.m4v' type='video/mp4'></source>
                    </video>
                    <div className={styles.title}>
                        <a>A melhor fórmula de prescrição</a>
                        <div className={styles.register}>
                            <a>Faça parte da Activus</a>
                        </div>
                        <div className={styles.containerRest}>
                            <div className={styles.descriptions}>
                                <div className={styles.about}>
                                    <a>Sua plataforma interativa pronta para sua prescrição magistral</a>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </>    
)}