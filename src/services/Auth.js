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
export const MENU_KEY = "@pap-menu";

//Verifica se existe dados no localStorage
export const getStorage = () => {

    let user = JSON.parse(localStorage.getItem(USER_KEY));
    //alert(JSON.stringify(user));

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

        return null;
    }

    let token = user.token !== null;
    let userid = user.id !== null;

    let con = localStorage.getItem(CONECT_KEY) !== null ? localStorage.getItem(CONECT_KEY) : false;

    let today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    let dTimeexp = new Date(localStorage.getItem(DATE_EXP));
    let dTimecur = new Date(dateTime);

    if (con == 'true') {

        let today2 = new Date(new Date().valueOf() + 3600000);

        let minutes2 = today2.getMinutes();
        let hours2 = today2.getHours();

        let date2 = today2.getFullYear() + "-" + (today2.getMonth() + 1) + "-" + today2.getDate();
        let time2 = hours2 + ":" + minutes2 + ":" + today2.getSeconds();
        let dateTime2 = date2 + ' ' + time2;

        localStorage.setItem(DATE_EXP, dateTime2);
        dTimeexp = new Date(dateTime2);

    }

    time = dTimecur.valueOf() < dTimeexp.valueOf();
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
                        return null;
                    }
                });
        }
        return null;

    }

    //alert('isAuthenticated: dTimecur = ' + dTimecur.valueOf() + '  dTimeexp = ' + dTimeexp.valueOf() );
    var localAuthok = (token && userid && time);

    //if (localAuthok == false){ alert("Sessão expirada! "); }
    //alert('localAuthok = ' + (localAuthok));
    
    return localAuthok ? user : null;

};

//Inicia a sessão no servidor e grava os dados de autenticação no localStorage
export const login = async (email, pass, con) => {

    if (email && pass) {

        let url = window.location.pathname.includes('/admin') ? './api/admins/login' : './api/login';

        await api.post(url, {
            login: email,
            password: pass
        }).then(async function (response) {
            console.log(response);

            let User = { Token: null, id: null };

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

                if (window.location.pathname.includes('/admin')) {
                    window.location.assign('/admin/dashboard');
                }
                else {
                    window.location.assign('/home');
                }
                

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
export const getAuth = async () => {

    const user = await getStorage();
    if (user) {

        //alert('storage: ' + JSON.stringify(user));

        let currentUser = null;

        if (await window.location.pathname.includes('/admin')) {
            //await alert('is admin');
            try {
                const response = await api.get('./api/admins?id=' + user.id);
                if (!response.data.id) {
                    //alert('Problemas na autenticação!\n' + message + '\nStatus: ' + status);     
                    await logout();
                    return null;
                }
                else { currentUser = response.data }
            } catch (err) {
                await logout();
                return null;
            }
          
        }
        else {
            try {
                const response = await api.get('./api/users?id=' + user.id);
                if (!response.data.id) {
                    //alert('Problemas na autenticação!\n' + message + '\nStatus: ' + status);     
                    await logout();
                    return null;
                } else { currentUser = response.data }
            } catch (err) {
                await logout();
                return null;
            }
           
        }
        return currentUser;
    }
    else {
        await logout();
        return null;
    }

}

export const verifyRecaptcha = async (Token, ipAddress) => {

    try {

        if (Token) {
            return true;
        } else {
            return false;
        }

        //const options = {
        //    method: 'POST',
        //    headers: {
        //        'Content-Type': 'application/json',
        //        'Access-Control-Allow-Origin' : '*'
        //    },
        //    body: JSON.stringify({
        //        secret: recaptchaSiteKey,
        //        response: Token,
        //        remoteip: ipAddress
        //    }),
        //};

        //await fetch('https://www.google.com/recaptcha/api/siteverify', options)
        //    .then(response => {
        //        if (!response.ok) {
        //            throw Error(response.status);
        //        }
        //        return response.json();
        //    })
        //    .catch(error => {
        //        throw Error(error);
        //    });

        //return true;

    } catch (err) {
        console.error(err)
        return false;
    }
   
}