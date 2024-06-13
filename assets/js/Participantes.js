//Lista de participantes
let participantes = [
  {
    nome: "João Felipe",
    email: "jofelipe2018@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 20, 0)
  },
  {
    nome: "Carlos Daniel",
    email: "carlosD@gmail.com",
    dataInscricao: new Date(2024, 1, 29, 1, 24),
    dataCheckIn: null
  },
  {
    nome: "Maria Silva",
    email: "maria.silva@gmail.com",
    dataInscricao: new Date(2024, 1, 21, 12, 45),
    dataCheckIn: new Date(2024, 1, 29, 15, 30)
  },
  {
    nome: "Ana Souza",
    email: "anasouza@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 10, 15),
    dataCheckIn: new Date(2024, 2, 28, 18, 20)
  },
  {
    nome: "Pedro Oliveira",
    email: "pedroliveira@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 14, 30),
    dataCheckIn: null
  },
  {
    nome: "Sara Costa",
    email: "sara.costa@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 9, 0),
    dataCheckIn: new Date(2024, 2, 26, 22, 15)
  },
  {
    nome: "Rafael Santos",
    email: "rafael.santos@gmail.com",
    dataInscricao: new Date(2024, 2, 19, 18, 10),
    dataCheckIn: new Date(2024, 2, 27, 20, 30)
  },
  {
    nome: "Mariana Lima",
    email: "mariana.lima@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 11, 20),
    dataCheckIn: new Date(2024, 2, 29, 19, 40)
  },
  {
    nome: "Paulo Martins",
    email: "paulo.martins@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 16, 50),
    dataCheckIn: null
  },
  {
    nome: "Aline Pereira",
    email: "aline.pereira@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 21, 30),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  //isso fará uma alteração direto do HTML
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  if (participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
       data-email = "${participante.email}" 
       onclick = "fazerCheckIn(event)"
      >
       Confirmar Check-in
      </button>
    `
  }
  return `<tr>
       <td>
       <strong>
         ${participante.nome}
       </strong>
       <br>
       <small>
         ${participante.email}
       </small>
       </td>
       <td>${dataInscricao}</td>
       <td>${dataCheckIn}<td>
         <tr>`
}

const atualizarLista = (participantes) => {
  let output = ""
  //estrutura de repetição - loop
  for (let participante of participantes) {
    //faça alguma coisa aqui
    //enquanto tiver pessoas nessa lista
    output = output + criarNovoParticipante(participante)
  }
  //suibstituir informação do HTML
  document.querySelector("tbody").innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null
  }
  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email
    }
  )

  if (participanteExiste) {
    alert("Email já cadastrado!")
    return
  }

  const nomeExiste = participantes.find(
    (p) => {
      return p.nome == participante.nome
    }
  )

  if (nomeExiste) {
    alert("Nome já cadastrado!")
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {

  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?"

  if (confirm(mensagemConfirmacao) == false) {
    return
  }


  const participante = participantes.find(
    (p) => {
      return p.email == event.target.dataset.email
    }
  )

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}