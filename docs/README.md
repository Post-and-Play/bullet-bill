<<<<<<< HEAD
# Código de integração com o Backend e Dialogs

Utilizamos a biblioteca "axios" para realizar a comunicação com o backend. As requisições podem ser definidas com seu 
respectivo método, sendo: GET, POST, PUT ou DELETE.
Foram adicionados os arquivos e pastas:

### contém o código do mecanismo de comunicação com o Backend e o código com funções de autorização e validação do usuário
=======
# C�digo de integra��o com o Backend e Dialogs

Utilizamos a biblioteca "axios" para realizar a comunica��o com o backend. As requisi��es podem ser definidas com seu 
respectivo m�todo, sendo: GET, POST, PUT ou DELETE.
Foram adicionados os arquivos e pastas:

### cont�m o c�digo do mecanismo de comunica��o com o Backend e o c�digo com fun��es de autoriza��o e valida��o do usu�rio
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
 - Pasta src/services
	- Api.js
	- Auth.js

<<<<<<< HEAD
### código para criação de forms modals, para facilitar o envio de notificações para o usuário através de dialogs.
=======
### c�digo para cria��o de forms modals, para facilitar o envio de notifica��es para o usu�rio atrav�s de dialogs.
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
 - src/components
	- Modals.js
	- Modals.css

<<<<<<< HEAD
### arquivos de mídia para composição dos dialogs
=======
### arquivos de m�dia para composi��o dos dialogs
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
 - src/image
	- check.png
	- critical.png
	- question.png
	- warning.png

# Exemplo de chamada ao backend

<<<<<<< HEAD
Para realizar chamadas em alguma página do frontend, primeiro deve-se realizar a iportação:
=======
Para realizar chamadas em alguma p�gina do frontend, primeiro deve-se realizar a iporta��o:
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8

``` javascript
import api from './services/Api';
```

<<<<<<< HEAD
Exempo de rqeuisição POST ( Quando envia dados )
=======
Exempo de rqeuisi��o POST ( Quando envia dados )
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8


```javascript
async function(){

<<<<<<< HEAD
    //Deve usar uma função assíncrona
=======
    //Deve usar uma fun��o ass�ncrona
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8

    await api.post('./api/users', {
            name: nomeInput + ' ' + sobrenomeInput,
            user_name: nomeUserInput,
            password: senhaInput,
            mail: emailInput,
            birth_date: anoInput + '-' + mesInput + '-' + diaInput 
        }).then(function (response) {
            console.log(response);

            if (root) {
                modals.htmlDialog(
                    root,
                    'Sua conta foi criada com sucesso!',
                    modals.msgboxButtons.okOnly,
                    modals.msgboxIcons.check,
                    'Mensagem!',
                    {
                        ok: (evt) => {
                            navigate('/');
                        }
                    });
            }
                       
        }).catch(function (error) {
            console.log(error);

            if (root) {
                modals.htmlDialog(
                    root,
<<<<<<< HEAD
                    'Não foi possível criar a conta!',
=======
                    'N�o foi poss�vel criar a conta!',
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
                    modals.msgboxButtons.okOnly,
                    modals.msgboxIcons.critical,
                    'Mensagem!',
                    {
                        ok: (evt) => {

                        }
                    });
            }

        });

}
```
<<<<<<< HEAD
# Função de autorização do usuário

Para verificar se o usuário está logado e autorizado para acessa, deve-se chamar as funções do pacote Auth.js
=======
# Fun��o de autoriza��o do usu�rio

Para verificar se o usu�rio est� logado e autorizado para acessa, deve-se chamar as fun��es do pacote Auth.js
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8

``` javascript
import { getAuth } from './services/Auth';
```

<<<<<<< HEAD
A função getAuth verifica se o usuário está com uma sessão ativa através do token de validação fornecido ao realizar login.
Geralmente podemos realiazar a verificação em qualquer momento. Veja um exemplo inserido no carregamento da página:
=======
A fun��o getAuth verifica se o usu�rio est� com uma sess�o ativa atrav�s do token de valida��o fornecido ao realizar login.
Geralmente podemos realiazar a verifica��o em qualquer momento. Veja um exemplo inserido no carregamento da p�gina:
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8

```javascript
onLoad={() => getAuth()}
```
<<<<<<< HEAD
Se o usuário não estiver validado a função força o retorno para a tela de login.
=======
Se o usu�rio n�o estiver validado a fun��o for�a o retorno para a tela de login.
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8



# criar dialogs boxes com mensagens

O pacote Modals.js fornece 3 modelos de Dialogs. 
<<<<<<< HEAD
1 - Modal personalizado, que permite incluir vários botões e conteúdos dinâmicos no carregamento
2 - Dialogobox de mensagem, com opcionais de tipo de mensagens: Sucesso, Pergunta, Atenção e Erro
=======
1 - Modal personalizado, que permite incluir v�rios bot�es e conte�dos din�micos no carregamento
2 - Dialogobox de mensagem, com opcionais de tipo de mensagens: Sucesso, Pergunta, Aten��o e Erro
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
3 - Modal de carregamento ( spinner )

Para criar uma mensgem:

```javascript

 import { Modals } from './components/Modals';

<<<<<<< HEAD
 // Busca o elemento root da página
 const root = document.getElementById('root');

 // Cria uma instância da classe Modals.
=======
 // Busca o elemento root da p�gina
 const root = document.getElementById('root');

 // Cria uma inst�ncia da classe Modals.
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
 const modals = new Modals();

 // Verifica se o elemento roo existe
 if (root) {

<<<<<<< HEAD
        // Chama a função de msgbox
=======
        // Chama a fun��o de msgbox
>>>>>>> 051e289046783c7dd87fd13763e3e4d43b031ed8
        modals.htmlDialog(
            root,
            'Sua mensagem!',
            modals.msgboxButtons.okOnly,
            modals.msgboxIcons.check,
            'Mensagem!',
            {
                ok: (evt) => {
                    navigate('/');
                }
            });
    }

```
