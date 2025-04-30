export default {
    base: process.env.NODE_ENV === 'production' ? '/DatGrafMD/' : '',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                page1a: '1a.html',
                page3d: '3d.html',
                page2a: '2a.html',
                page72a: '72a.html',
            }
        }
    }
};
