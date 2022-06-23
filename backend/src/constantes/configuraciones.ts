export const CONFIGURACIONES = {
        bdd: {
            type: 'mysql',
            host: 'localhost',
            port: 49158,
            username: 'root',
            password: 'mysqlpw',
            database: 'mysql',
            synchronize: true, // consumir la base, no crear --> false
            dropSchema: true, // only developer mode
        },
        crearDatosTest: true
    }
;
