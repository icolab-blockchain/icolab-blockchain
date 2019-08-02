# iColab - Rede Privada Blockchain
Modulo de blockchain para operações em geral.

## Módulos Atuais

Inicialmente estão expostos serviços de:

* Criação de pares de chave
* UpVoting

## Pré-Requisitos

Para poder utilizar a Blockchain Privada, é necessário instalar o Git para clonar o repositório e o Docker para subir o ambiente.

## Como Instalar

`git clone https://github.com/icolab-blockchain/icolab-blockchain`  
`cd icolab-blockchain`  
`docker-compose up --build -d`

## Serviços

Os serviços instalados são:
* Geth: mineração da rede privada Ethereum (Porta 8545)
* API: Operação dos endpoints (Porta 5000)
* nginx: Proxy reverso (Porta 8080 ou 4000)

## Como Utilizar

Faça todas as requisições para a porta 8080 do nginx. 
Os endpoints estão disponíveis estão documentados a seguir:

### Get /account
Retorna: 
``{  
	publicKey: "",  
	privateKey: "",  
	account: ""  
}
``

### Post /vote
Parâmetros:
``{  
	account: "conta criadad no /account",  
	candidate: "ID do candidato quem irá receber o voto"  
}``
Retorna:
``{  
	error: "em caso de parâmetros inválidos"  
}  
{  
	transactionHash: 'Hash da transação na Blockchain para consultas posteriores'  
}``

### Get /vote/:candidate
Retorna
``{  
	candidate: "ID do candidato que consultado",  
	votes: "A quantidade de votos do candidato"  
}``  

### Get /upvoting
Retorna
``{  
	address: "Endereço do contrato de upvoting na Blockchain"  
}``  

### Post /upvoting
Parâmetros
``{  
	address: "Novo endereço do contrato de upvogin"  
}