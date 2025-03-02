import mongoose from 'mongoose';

const url = 'mongodb+srv://Grupo-03:grupo03@cursadanodejs.ls9ii.mongodb.net/Node-js'; 

mongoose.connect(url)
.then(() => console.log(' Conexión exitosa a MongoDB'))
.catch(err => console.error(' Error al conectar a MongoDB:', err));


const esquemaSuperheroe = new mongoose.Schema(
{   
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: { type: String },
    poderes: { type: [String] },
    aliados: { type: [String] },
    enemigos: { type: [String] },
    creador: { type: String }
});

const modeloSuperheroe = mongoose.model('Grupo-03', esquemaSuperheroe, 'Grupo-03');

async function insertarSuperHeroe() {
    const hero = new modeloSuperheroe({
        nombreSuperHeroe: 'Shadow Striker',
        nombreReal: 'Ethan Drake',
        edad: 32,
        planetaOrigen: 'Nebulon-5',
        debilidad: 'Luz intensa',
        poderes: [
            'Invisibilidad en la oscuridad',
            'Teletransportación a corta distancia',
            'Reflejos sobrehumanos',
            'Maestro en combate cuerpo a cuerpo'
        ],
        aliados: ['Night Phantom', 'Cyber Guardian'],
        enemigos: ['Doctor Eclipse', 'Crimson Reaper'],
        creador: 'Emiliano'
    });

    await hero.save();
    console.log('Superhéroe insertado:', hero);
}

insertarSuperHeroe();



async function actualizarSuperHeroe(nombreSuperHeroe) {
    const result = await modeloSuperheroe.updateOne(
      { nombreSuperHeroe: nombreSuperHeroe },
      { $set: { edad: 26 } }
    );
    console.log('Resultado de la actualización: ', result);
  }
  
actualizarSuperHeroe('Shadow Striker');


  

async function borrarSuperHeroe(nombreSuperHeroe) {
   
    const result = await modeloSuperheroe.deleteOne({nombreSuperHeroe: nombreSuperHeroe});
    console.log('Superheroe eliminado:',result);
  }
  
 
borrarSuperHeroe('Shadow Striker');

 async function buscarSuperHeroes() {
    const superHeroes = await modeloSuperheroe.find({ nombreSuperHeroe: 'Shadow Striker' });
    console.log('Superhéroes encontrados:', superHeroes);
  }
  
 buscarSuperHeroes();
  