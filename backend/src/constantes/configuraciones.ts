export const CONFIGURACIONES = {
        bdd: {
            type: 'mysql',
            host: 'localhost', //vraw.cs5ithf0vstb.us-east-1.rds.amazonaws.com
            port: 49153,
            username: 'root',
            password: 'mysqlpw',
            database: 'vraw',
            synchronize: true, // consumir la base, no crear --> false
            dropSchema: false, // false para build
        },
        crearDatosTest: false// false para build
    }
;
