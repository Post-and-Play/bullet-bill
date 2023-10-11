# C�digo de integra��o com o Backend e Dialogs

Utilizamos a biblioteca "axios" para realizar a comunica��o com o backend. As requisi��es podem ser definidas com seu 
respectivo m�todo, sendo: GET, POST, PUT ou DELETE.
Foram adicionados os arquivos e pastas:

### cont�m o c�digo do mecanismo de comunica��o com o Backend e o c�digo com fun��es de autoriza��o e valida��o do usu�rio
 - Pasta src/services
	- Api.js
	- Auth.js

### c�digo para cria��o de forms modals, para facilitar o envio de notifica��es para o usu�rio atrav�s de dialogs.
 - src/components
	- Modals.js
	- Modals.css

### arquivos de m�dia para composi��o dos dialogs
 - src/image
	- check.png
	- critical.png
	- question.png
	- warning.png

# Exemplo de chamada ao backend

Para realizar chamadas em alguma p�gina do frontend, primeiro deve-se realizar a iporta��o:

``` javascript
import api from './services/Api';
```

Exempo de rqeuisi��o POST ( Quando envia dados )


```javascript
async function(){

    //Deve usar uma fun��o ass�ncrona

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
                    'N�o foi poss�vel criar a conta!',
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
# Fun��o de autoriza��o do usu�rio

Para verificar se o usu�rio est� logado e autorizado para acessa, deve-se chamar as fun��es do pacote Auth.js

``` javascript
import { getAuth } from './services/Auth';
```

A fun��o getAuth verifica se o usu�rio est� com uma sess�o ativa atrav�s do token de valida��o fornecido ao realizar login.
Geralmente podemos realiazar a verifica��o em qualquer momento. Veja um exemplo inserido no carregamento da p�gina:

```javascript
onLoad={() => getAuth()}
```
Se o usu�rio n�o estiver validado a fun��o for�a o retorno para a tela de login.



# criar dialogs boxes com mensagens

O pacote Modals.js fornece 3 modelos de Dialogs. 
1 - Modal personalizado, que permite incluir v�rios bot�es e conte�dos din�micos no carregamento
2 - Dialogobox de mensagem, com opcionais de tipo de mensagens: Sucesso, Pergunta, Aten��o e Erro
3 - Modal de carregamento ( spinner )

Para criar uma mensgem:

```javascript

 import { Modals } from './components/Modals';

 // Busca o elemento root da p�gina
 const root = document.getElementById('root');

 // Cria uma inst�ncia da classe Modals.
 const modals = new Modals();

 // Verifica se o elemento roo existe
 if (root) {

        // Chama a fun��o de msgbox
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
