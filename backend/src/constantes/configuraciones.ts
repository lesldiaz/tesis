export const CONFIGURACIONES = {
        bdd: {
            type: 'mysql',
            host: 'localhost', //vraw.cs5ithf0vstb.us-east-1.rds.amazonaws.com
            port: 3306,
            username: 'root',
            password: 'root2022',
            database: 'vraw',
            synchronize: true, // consumir la base, no crear --> false
            dropSchema: true, // false para build
        },
        crearDatosTest: true // false para build
    }
;
