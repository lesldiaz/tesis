export const CONFIGURACIONES = {
        bdd: {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root2022',
            database: 'vraw',
            synchronize: true, // consumir la base, no crear --> false
            dropSchema: true, // only developer mode
        },
        crearDatosTest: true
    }
;
