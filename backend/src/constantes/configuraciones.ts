export const CONFIGURACIONES = {
        bdd: {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root2022',
            database: 'vraw',
            synchronize: false, // consumir la base, no crear --> false
            dropSchema: false, // only developer mode
        },
        crearDatosTest: false
    }
;
