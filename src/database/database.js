import Sequelize, {Sequelize} from 'sequelize';

export const sequelize= new Sequelize( 
    'shuar',
    'postgres',
    'c1997',
    {
        host:'localhost',
        dialect:'postgres',
        pool:{
            max:5,
            min:0,
            require:30000,
            idle:10000
        },
        //mensaje de operaciones  por consola desativadas
        logging:false
    }
)