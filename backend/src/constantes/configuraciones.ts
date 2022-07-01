export const CONFIGURACIONES = {
        bdd: {
            type: 'mysql',
            host: process.env.DATABASE_URL,
            port: 3306,
            username: 'root',
            password: 'root2022',
            database: 'vraw',
            synchronize: true, // consumir la base, no crear --> false
            dropSchema: false, // false para build
        },
        crearDatosTest: false // false para build
    }
;
