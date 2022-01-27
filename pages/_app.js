import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

// styles
import '../styles/main.scss';



function MyApp({ Component, pageProps }) {
	React.useEffect(() => {
		const start = () => NProgress.start();
		const end = () => NProgress.done();
		
		/*
			Usando o objeto Router do Next-JS e a biblioteca Nprogress para renderizar uma barra de carregamento na tela.....
		*/
		Router.events.on('routerChangeStart', start);
		Router.events.on('routerChangeComplete', end);
		Router.events.on('routerChangeError', end);
		
		// Limpar, quando Unmount
		return () => {
			Router.events.off('routerChangeStart', start);
			Router.events.off('routerChangeComplete', end);
			Router.events.off('routerChangeError', end);
		};
	}, []);
	
	
  return <Component {...pageProps} />
}


export default MyApp


