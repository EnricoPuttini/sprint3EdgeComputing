//Nomes, rms e turma:

//Turma: 1ESPH

//Giovanni Tarzoni Piccin - RM: 564014
//Enrico Gianni Nóbrega Puttini - RM: 561400
//Henrique Infanti Coratolo - RM: 561865
//Jean Carlos Rodrigues da Silva - RM: 566439
//Bruno Lobosque - RM: 561254




// sensor.js
const mqtt = require('mqtt');

// Endereço do servidor MQTT público que vamos usar
const brokerUrl = 'mqtt://broker.hivemq.com';
const client = mqtt.connect(brokerUrl);

// O "endereço" único para os dados da nossa partida
const topic = 'passabola/partida/123'; 

// Quando o sensor conseguir se conectar ao servidor...
client.on('connect', () => {
  console.log('✅ Sensor conectado ao Broker MQTT!');
  console.log('Enviando um novo evento do jogo a cada 4 segundos...');

  // A cada 5 segundos, a mágica acontece aqui:
  setInterval(() => {
  const times = ['Corinthians', 'Cruzeiro'];
  const jogadorasCor = ['Gabi Zanotti', 'Tamires', 'Gabi Portilho'];
  const jogadorasCru = ['Byanca Brasil', 'Rafa Andrade', 'Nine'];
  
  // Gera uma posse de bola que varia suavemente
  const posseBase = 50;
  const posseVariacao = Math.floor(Math.random() * 15) - 7; // Varia entre -7 e +7
  const posseAtual = posseBase + posseVariacao;

  const events = [
    { evento: 'posse_de_bola', time: times[Math.floor(Math.random()*times.length)], posse_percentual: posseAtual },
    { evento: 'finalizacao', time: times[Math.floor(Math.random()*times.length)], jogadora: jogadorasCru[Math.floor(Math.random()*jogadorasCru.length)], posse_percentual: posseAtual },
    { evento: 'gol', time: 'Corinthians', jogadora: 'Gabi Zanotti', minuto: 78, posse_percentual: posseAtual },
    { evento: 'cartao_amarelo', time: 'Cruzeiro', jogadora: 'Camila Ambrózio', posse_percentual: posseAtual }
  ];

  const randomEvent = events[Math.floor(Math.random() * events.length)];
  const payload = JSON.stringify(randomEvent);

  client.publish(topic, payload, () => {
    console.log(`🚀 Dado enviado -> Tópico: ${topic}, Dados: ${payload}`);
  });

}, 4000); // Intervalo de 4000 milissegundos = 4 segundos
});

client.on('error', (error) => {
   console.error('Falha ao conectar:', error);
   client.end();
});