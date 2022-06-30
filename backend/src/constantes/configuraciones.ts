export const CONFIGURACIONES = {
  bdd: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root', //id19193936_root
    password: 'root2022', //4F0AEF7cveJPa>zC
    database: 'vraw', //id19193936_vraw
    synchronize: true, // consumir la base, no crear --> false
    dropSchema: false, // only developer mode
  },
  crearDatosTest: false,
};
