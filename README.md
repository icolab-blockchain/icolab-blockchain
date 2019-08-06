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

	{  
		publicKey: "",  
		privateKey: "",  
		account: ""  
	}

### Post /vote
Parâmetros:

	{  
		account: "conta criadad no /account",  
		candidate: "ID do candidato quem irá receber o voto"  
	}
Retorna:

	{  
		error: "em caso de parâmetros inválidos"  
	}

...ou

	{  
		transactionHash: 'Hash da transação na Blockchain para consultas posteriores'  
	}

### Get /vote/:candidate
Retorna

	{  
		candidate: "ID do candidato que consultado",  
		votes: "A quantidade de votos do candidato"  
	}

### Get /upvoting
Retorna

	{  
		address: "Endereço do contrato de upvoting na Blockchain"  
	}  

### Post /upvoting
Parâmetros

	{  
		address: "Novo endereço do contrato de upvogin"  
	}

### Get /history/:page/:size
Retorna o histórico de votações em ordem reversa, da mais nova para a mais antiga, em páginas. O parâmetro retorna a `size` registros da página `page` de eventos.

Retorna

	[
		{
	        "logIndex": 0,
	        "transactionIndex": 0,
	        "transactionHash": "0x40ef9aa4b250f05c5f1048a896b1738e932568fa1cd267b8aead13454f274681",
	        "blockHash": "0x7a2c401be6925f7db5fef5312b0c13aa8086e932d28721118a709d7b3f9c6f36",
	        "blockNumber": 12,
	        "address": "0x0cdD88E60e44526Ce31951B37cA32dB695d9C780",
	        "type": "mined",
	        "id": "log_1cf4e8d2",
	        "returnValues": {
	            "0": "0x20C535EAc57Da212Ad76D85B12E015ee186914f6",
	            "1": "0xd27a9b6677634d8bcf05e90adc0d37cd0aaf85d473d41a50dfa1ac9ab09699aa",
	            "sender": "0x20C535EAc57Da212Ad76D85B12E015ee186914f6",
	            "vote": "0xd27a9b6677634d8bcf05e90adc0d37cd0aaf85d473d41a50dfa1ac9ab09699aa"
	        },
	        "event": "Voted",
	        "signature": "0xc78796858497f000f0a77d7f0c624bbaf635bf26239188e8fba52c571db2398d",
	        "raw": {
	            "data": "0x00000000000000000000000020c535eac57da212ad76d85b12e015ee186914f6d27a9b6677634d8bcf05e90adc0d37cd0aaf85d473d41a50dfa1ac9ab09699aa",
	            "topics": [
	                "0xc78796858497f000f0a77d7f0c624bbaf635bf26239188e8fba52c571db2398d"
	            ]
	        }
	    }
	]