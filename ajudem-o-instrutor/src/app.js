import express, { json } from 'express';
import cors from 'cors';


const server = express();
server.use(cors());
server.use(json());

const receitas = [
  {
    id: 1,
    titulo: "Pão com Ovo",
    ingredientes: "Ovo e pão",
    preparo: "Frite o ovo e coloque no pão",
    views: 0,
  },
  {
    id: 2,
    titulo: "Bolo",
    ingredientes: "Ovo e pão",
    preparo: "Frite o ovo e coloque no pão",
    views: 0,
  }
];

server.get('/receitas', (req, res) => {
  res.send(receitas);
});

server.get('/receitas/:idDaReceita', (req, res) => {
  const receitaFiltrada = receitas.find(receita => receita.id === parseInt(req.params.idDaReceita));
  if(!receitaFiltrada) {
    return res.status(404).send("Não")
  }
  receitaFiltrada.views++
  res.send(receitaFiltrada);
});

server.post('/receitas', (req, res) => {
  const buscaReceita = receitas.find((rec) =>  rec.titulo === req.body.titulo)
  if(buscaReceita) {

   return  res.status(409).send("Receita já existente")
  }
  
  if(!req.body.titulo ||!req.body.ingredientes|| !req.body.preparo ) {
    return res.status(422).send('Todos os campos são obrigatórios')
  }
  receitas.push(req.body);
   res.status(201).send("Criado");
})

server.listen(5002, () => {
  console.log("Rodando em http://localhost:5000");
});
