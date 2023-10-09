/* eslint eqeqeq: 'off' */
/* eslint no-redeclare: 'off' */
/* eslint no-unused-vars: 'off' */
/* eslint no-useless-concat: 'off' */
/* eslint no-use-before-define: 'off' */
/* eslint no-loop-func: 'off' */
/* eslint default-case: 'off' */
/* eslint no-mixed-operators: 'off' */
/* eslint default-case: 'off' */

import api from './Api';
import { Modals } from '../components/Modals';

const root = document.getElementById('root');
const modals = new Modals();
const loading = new modals.htmlLoading(root);

export const recaptchaSiteKey = process.env.REACT_APP_RECAPTCHASECRETKEY;
export const USER_KEY = "@pap-token";
export const DATE_EXP = "@pap-expire";
export const CONECT_KEY = "@pap-persist";

export var User = { Token: null, id: null };

//Verifica se existe dados no localStorage
export const getStorage = () => {

    var user = JSON.parse(localStorage.getItem(USER_KEY)) !== null;
    if (!user) {

        try {

            let test = 'localStorage Test!';
            localStorage.setItem('@pap-test', test);

            if (localStorage.getItem('@pap-test') == null) {

                if (root) {
                    modals.htmlDialog(
                        root,
                        'Infelizmente não há suporte para este navegador!',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.warning,
                        'Mensagem!',
                        {
                            ok: (evt) => {

                            }
                        });
                }

            }
            else {
                localStorage.removeItem('@pap-test');
            }

        }
        catch (err) {

            if (root) {
                modals.htmlDialog(
                    root,
                    'Infelizmente não há suporte para este navegador!\n' + err,
                    modals.msgboxButtons.okOnly,
                    modals.msgboxIcons.warning,
                    'Mensagem!',
                    {
                        ok: (evt) => {

                        }
                    });
            }

        }

        return false;
    }

    var token = user.token !== null;
    var userid = user.id !== null;

    var con = localStorage.getItem(CONECT_KEY) !== null ? localStorage.getItem(CONECT_KEY) : 0;

    var today = new Date();
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    var dTimeexp = new Date(localStorage.getItem(DATE_EXP));
    var dTimecur = new Date(dateTime);

    if (con == 1) {

        var today2 = new Date(new Date().valueOf() + 3600000);

        var minutes2 = today2.getMinutes();
        var hours2 = today2.getHours();

        var date2 = today2.getFullYear() + "-" + (today2.getMonth() + 1) + "-" + today2.getDate();
        var time2 = hours2 + ":" + minutes2 + ":" + today2.getSeconds();
        var dateTime2 = date2 + ' ' + time2;

        localStorage.setItem(DATE_EXP, dateTime2);
        dTimeexp = new Date(dateTime2);

    }

    var time = dTimecur.valueOf() < dTimeexp.valueOf();
    //alert(time);

    if (!time) {

        let myTime = { ok: false, value: false };
        let seconds = 10;

        if (root) {
            modals.htmlDialog(
                root,
                'Sua sessão expirou.',
                modals.msgboxButtons.okOnly,
                modals.msgboxIcons.warning,
                'Mensagem!',
                {
                    ok: (evt) => {

                    }
                });
        }

    }

    //alert('isAuthenticated: dTimecur = ' + dTimecur.valueOf() + '  dTimeexp = ' + dTimeexp.valueOf() );
    var localAuthok = (token && userid && time);

    //if (localAuthok == false){ alert("Sessão expirada! "); }
    //alert('localAuthok = ' + (localAuthok));
    return localAuthok;

};

//Obtem os dados de usuário no localStorage
export const getUser = async () => {
    if (await getStorage() == true)
        return JSON.parse(localStorage.getItem(USER_KEY));
    else {
        logout();
    }
};

//Inicia a sessão no servidor e grava os dados de autenticação no localStorage
export const login = async (email, pass, con) => {

    //let location = window.location;
    if (email && pass) {

        await api.post('./api/login', {
            login: email,
            password: pass
        }).then(async function (response) {
            console.log(response);
                        
            User = { Token: null, id: null };

            if (response.data.Token) {

                User.Token = response.data.Token;
                User.id = response.data.id;

                await localStorage.setItem(USER_KEY, JSON.stringify(User));
                await localStorage.setItem(CONECT_KEY, con);

                var today = new Date(new Date().valueOf() + 3600000);

                var minutes = today.getMinutes();
                var hours = today.getHours();

                var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
                var time = hours + ":" + minutes + ":" + today.getSeconds();
                var dateTime = date + ' ' + time;

                await localStorage.setItem(DATE_EXP, dateTime);
                window.location.assign('/home');

            }
            else {

                var firstProp;
                for (var key in response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        firstProp = response.data[key];
                        break;
                    }
                }

                if (root && firstProp) {
                    modals.htmlDialog(
                        root,
                        firstProp,
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.critical,
                        'Mensagem!',
                        {
                            ok: (evt) => {

                            }
                        });
                }
                               
            }

        }).catch(async function (error) {
            let objerr = JSON.parse(JSON.stringify(error));
            console.log(objerr.message);

            if (objerr.status === 403 || objerr.status === 404) {
                if (root) {
                    modals.htmlDialog(
                        root,
                        'Credenciais inválidas!',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.critical,
                        'Mensagem!',
                        {
                            ok: (evt) => {

                            }
                        });
                }
            }
                      

        });
  
        
    }
   
};

//Remove os dados no localStorage
export const logout = async () => {

    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(DATE_EXP);
   
};

//Para verificar a autorização do usuario durante a sessão
export const getAuth = async (showMsg = false) => {

    //Para obter parametros da url no navegador se necessário
    //let location = window.location;
    //let search = window.location.search;
    //let params = new URLSearchParams(search);
  
    if (await getStorage() == true) {

        User = await getUser();
      
        var id = User.id;
            
        //alert('isAuthenticated = true');

        const response = await api.get('./api/users?id=' + id);
        if (!response.data.id) {                        
            //alert('Problemas na autenticação!\n' + message + '\nStatus: ' + status);     
            await logout();
            window.location.assign('/');
        }

        //Se pretender osrar o nome do usuário na página!

        //var usern = document.getElementById('user_name');
        //if (usern) {
        //    usern.innerHTML = response.data.name;
        //}
      
        //localStorage.setItem(USER_KEY, JSON.stringify(User));

        //alert('isAuthenticated = true');
       
    }
    else {
        //alert('isAuthenticated = false');
        //await logout();
        window.location.assign('/');

    }

}
