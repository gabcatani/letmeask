module.export = {
    resolve: {
        fallback: {
           process: require.resolve('process/browser') 
        }
    }
}