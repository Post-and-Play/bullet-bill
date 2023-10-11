/* eslint eqeqeq: 'off' */
/* eslint no-redeclare: 'off' */
/* eslint no-unused-vars: 'off' */
/* eslint no-useless-concat: 'off' */
/* eslint no-use-before-define: 'off' */
/* eslint no-loop-func: 'off' */
/* eslint default-case: 'off' */
/* eslint no-mixed-operators: 'off' */
/* eslint default-case: 'off' */
/* eslint no-unused-expressions: 'off' */

import './Modals.css'

import check from '../image/check.png';
import critical from '../image/critical.png';
import warning from '../image/warning.png';
import question from '../image/question.png';
import Loading from '../image/loading.svg';


//Classe para criar modals na página
//!importante que o CSS esteja devidamente estilizado
export class Modals {
    constructor() {

        const me = this;

        this.htmlButton = function (parent, info, style) {

            //Container que abriga os controles
            var ul = document.createElement('ul');
            if (info.containerId)
                ul.id = info.containerId;

            if (info.containerClass)
                ul.className = info.containerClass;

            if (style.containerWidth)
                ul.style.width = style.containerWidth;

            if (style.containerHeight)
                ul.style.height = style.containerHeight;

            if (style.display != undefined)
                ul.style.display = style.display;

            //Botão
            var text = document.createElement('button');
            if (info.inputId)
                text.id = info.inputId;

            if (info.inputClass)
                text.className = info.inputClass;

            if (style.inputWidth)
                text.style.width = style.inputWidth;

            if (style.inputColor)
                text.style.color = style.inputColor;

            if (style.inputMarginTop)
                text.style.marginTop = style.inputMarginTop;

            if (info.value)
                text.innerHTML = info.value;

            if (info.sub) {
                text.onclick = async () => { info.sub() };
            }

            ul.appendChild(text);
            parent.appendChild(ul);

            return text;

        }

        //Modals...
        this.htmlModal = function (parent, info, style) {

            var modalId = info.modalId ? info.modalId : 'modalform';
            function form_close(id) {
                var modal = document.getElementById(id);
                if (modal) {
                    modal.style.display = 'none';
                    parent.removeChild(modal);
                }
            }

            form_close(modalId);

            var modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'modal';
            modal.setAttribute('role', 'dialog');

            //Modal Content
            let modalcontent = document.createElement('div');
            modalcontent.className = 'modal-content';

            if (style.contentMaxWidth)
                modalcontent.style.maxWidth = style.contentMaxWidth;

            if (style.contentWidth)
                modalcontent.style.width = style.contentWidth;

            if (style.contentHeight)
                modalcontent.style.height = style.contentHeight;


            //Header
            let modalheader = document.createElement('div');
            modalheader.className = 'modal-header';

            if (info.btnClose == undefined || info.btnClose == true) {

                let close = document.createElement('span');
                close.className = 'close';
                close.setAttribute('data-dismiss', 'modal');
                close.setAttribute('name', modalId);
                close.innerHTML = '&times;'
                if (info.onclickClose != undefined) {
                    close.onclick = async function (evt) {
                        let resp = await info.onclickClose();
                        //alert('resp: ' + resp);
                        if (resp === 1) {
                            var name = evt.target.getAttribute('name');
                            form_close(name);
                        }
                    }
                }
                else {
                    close.onclick = function (evt) {
                        var name = evt.target.getAttribute('name');
                        form_close(name);
                    }
                }

                modalheader.appendChild(close);

            }


            let modaltitle = document.createElement('h4');
            modaltitle.className = 'modal-title';

            if (info.title)
                modaltitle.innerHTML = info.title;

            modalheader.appendChild(modaltitle);
            modalcontent.appendChild(modalheader)
            //Header

            //Body
            let modalbody = document.createElement('div');
            modalbody.className = 'modal-body';
            modalcontent.appendChild(modalbody);

            let modalfooter = document.createElement('div');
            modalfooter.className = 'modal-footer';

            if (info.buttons) {
                if (info.buttons.length > 0) {

                    for (var i = 0; i < info.buttons.length; i++) {
                        let ul = document.createElement('ul');
                        let btn = document.createElement('BUTTON');
                        btn.setAttribute('name', modalId);
                        let obj = info.buttons[i];

                        if (obj.id)
                            btn.id = obj.id;

                        if (obj.className)
                            btn.className = obj.className;

                        if (obj.width)
                            btn.style.width = obj.width;

                        if (obj.text)
                            btn.innerHTML = obj.text;

                        if (obj.click) {
                            btn.onclick = async (evt) => {
                                let resp = await obj.click();
                                //alert('resp: ' + resp);
                                if (resp === 1) {
                                    var name = evt.target.getAttribute('name');
                                    form_close(name);
                                }

                            }
                        }

                        ul.appendChild(btn);
                        modalfooter.appendChild(ul);
                    }

                }
            }

            modalcontent.appendChild(modalfooter);
            modal.appendChild(modalcontent);

            parent.appendChild(modal);

            modal.style.display = 'flex';
            return modalbody;

        }

        //Dialogs........
        this.msgboxButtons = Object.freeze({ okOnly: 0, okCancel: 1, yesNo: 2, yesNoCancel: 3 });
        this.msgboxIcons = Object.freeze({ check: 0, critical: 1, warning: 2, question: 3 });

        this.htmlDialog = function (parent, text, buttons, icons, title, actions, others) {

            function msgbox_close() {
                var modal = document.getElementById('msgbox');
                if (modal) {
                    modal.style.display = 'none';
                }
            }


            let modal = document.getElementById('msgbox');
            if (modal) {
                parent.removeChild(modal);
            }

            modal = document.createElement('div');
            modal.id = 'msgbox';
            modal.className = 'modal';
            modal.setAttribute('role', 'dialog');

            //Modal Content
            let modalcontent = document.createElement('div');
            modalcontent.className = 'modal-content-dialog';

            //Header
            let modalheader = document.createElement('div');
            modalheader.className = 'modal-header';

            //let close = document.createElement('span');
            //close.className = 'close';
            //close.setAttribute('data-dismiss', 'modal');
            //close.innerHTML = '&times;'
            //close.onclick = function(){
            //    msgbox_close();
            //}

            //modalheader.appendChild(close);

            let modaltitle = document.createElement('h4');
            modaltitle.className = 'modal-title';

            if (title)
                modaltitle.innerHTML = title;
            else
                modaltitle.innerHTML = 'Mensagem';

            modalheader.appendChild(modaltitle);
            modalcontent.appendChild(modalheader)
            //Header

            //Body
            let modalbody = document.createElement('div');
            modalbody.className = 'modal-body';

            //alert(icons);

            if (icons === undefined) {

                if (text) {
                    let itens = [];
                    itens = String(text).split('\n');
                    if (itens.length > 1) {
                        for (var i = 0; i < itens.length; i++) {
                            let txt = document.createElement('p');
                            txt.innerHTML = itens[i];
                            modalbody.appendChild(txt);
                        }
                    }
                    else {
                        let txt = document.createElement('p');
                        txt.innerHTML = text;
                        modalbody.appendChild(txt);
                    }
                }

                if (others) {
                    if (others.textId) {
                        let txt = document.createElement('p');
                        txt.id = others.textId;

                        if (others.textValue)
                            txt.innerHTML = others.textValue;
                        modalbody.appendChild(txt);
                    }
                }
            }
            else {

                modalbody.style.display = 'flex';
                modalbody.style.flexDirection = 'row';

                let column1 = document.createElement('div');
                column1.className = 'modal-body-dialog-text';

                let column2 = document.createElement('div');
                column2.className = 'modal-body-dialog-icons';

                let img = document.createElement('img');
                img.style.margin = '0 auto';
                img.style.width = '50px';
                img.style.height = '50px';

                if (icons == this.msgboxIcons.check) {
                    img.src = check;
                }

                if (icons == this.msgboxIcons.critical) {
                    img.src = critical;
                }

                if (icons == this.msgboxIcons.warning) {
                    img.src = warning;
                }

                if (icons == this.msgboxIcons.question) {
                    img.src = question;
                }

                column2.appendChild(img);

                if (text) {
                    let itens = [];
                    itens = String(text).split('\n');
                    if (itens.length > 1) {
                        for (var i = 0; i < itens.length; i++) {
                            let txt = document.createElement('p');
                            txt.innerHTML = itens[i];
                            column1.appendChild(txt);
                        }
                    }
                    else {
                        let txt = document.createElement('p');
                        txt.innerHTML = text;
                        column1.appendChild(txt);
                    }
                }

                if (others) {
                    if (others.textId) {
                        let txt = document.createElement('p');
                        txt.id = others.textId;

                        if (others.textValue)
                            txt.innerHTML = others.textValue;
                        column1.appendChild(txt);
                    }
                }

                modalbody.appendChild(column1);
                modalbody.appendChild(column2);

            }

            modalcontent.appendChild(modalbody);


            let modalfooter = document.createElement('div');
            modalfooter.className = 'modal-footer';

            if (buttons) {

                if (buttons === this.msgboxButtons.okOnly) {
                    this.htmlButton(modalfooter, {
                        inputId: 'mboxOk',
                        containerClass: 'one-col',
                        value: 'Ok',
                        inputClass: 'btn-default',
                        sub: actions != undefined ? actions.ok ? () => { actions.ok(); msgbox_close() } : () => msgbox_close() : () => msgbox_close()
                    }, {});
                }
                else if (buttons === this.msgboxButtons.okCancel) {
                    this.htmlButton(modalfooter, {
                        inputId: 'mboxOk',
                        containerClass: 'two-col',
                        value: 'Ok',
                        inputClass: 'btn-default',
                        sub: actions != undefined ? actions.ok ? () => { actions.ok(); msgbox_close() } : () => msgbox_close() : () => msgbox_close()
                    }, {});
                    this.htmlButton(modalfooter, {
                        inputId: 'mboxCancel',
                        containerClass: 'two-col',
                        value: 'Cancelar',
                        inputClass: 'btn-default',
                        sub: actions != undefined ? actions.cancel ? () => { actions.cancel(); msgbox_close() } : () => msgbox_close() : () => msgbox_close()
                    }, {});
                }
                else if (buttons === this.msgboxButtons.yesNo) {
                    this.htmlButton(modalfooter, {
                        inputId: 'mboxYes',
                        containerClass: 'two-col',
                        value: 'Sim',
                        inputClass: 'btn-default',
                        sub: actions != undefined ? actions.yes ? () => { actions.yes(); msgbox_close() } : () => msgbox_close() : () => msgbox_close()
                    }, {});
                    this.htmlButton(modalfooter, {
                        inputId: 'mboxNo',
                        containerClass: 'two-col',
                        value: 'Não',
                        inputClass: 'btn-default',
                        sub: actions != undefined ? actions.no ? () => { actions.no(); msgbox_close() } : () => msgbox_close() : () => msgbox_close()
                    }, {});
                }
                else if (buttons === this.msgboxButtons.yesNoCancel) {
                    this.htmlButton(modalfooter, {
                        inputId: 'mboxYes',
                        containerClass: 'two-col',
                        value: 'Sim',
                        inputClass: 'btn-default',
                        sub: actions != undefined ? actions.yes ? () => { actions.yes(); msgbox_close() } : () => msgbox_close() : () => msgbox_close()
                    }, {});
                    this.htmlButton(modalfooter, {
                        inputId: 'mboxNo',
                        containerClass: 'two-col',
                        value: 'Não',
                        inputClass: 'btn-default',
                        sub: actions != undefined ? actions.no ? () => { actions.no(); msgbox_close() } : () => msgbox_close() : () => msgbox_close()
                    }, {});
                    this.htmlButton(modalfooter, {
                        inputId: 'mboxCancel',
                        containerClass: 'two-col',
                        value: 'Cancelar',
                        inputClass: 'btn-default',
                        sub: actions != undefined ? actions.cancel ? () => { actions.cancel(); msgbox_close() } : () => msgbox_close() : () => msgbox_close()
                    }, {});
                }
                else {
                    this.htmlButton(modalfooter, {
                        inputId: 'mboxOk',
                        containerClass: 'one-col',
                        value: 'Ok',
                        inputClass: 'btn-default',
                        sub: actions != undefined ? actions.ok ? () => { actions.ok(); msgbox_close() } : () => msgbox_close() : () => msgbox_close()
                    }, {});
                }

            }
            else {
                this.htmlButton(modalfooter, {
                    inputId: 'mboxOk',
                    containerClass: 'one-col',
                    value: 'Ok',
                    inputClass: 'btn-default',
                    sub: actions != undefined ? actions.ok ? () => { actions.ok(); msgbox_close() } : () => msgbox_close() : () => msgbox_close()
                }, {});
            }

            modalcontent.appendChild(modalfooter);
            modal.appendChild(modalcontent);

            parent.appendChild(modal);

            modal.style.display = 'flex';

            return modalbody;

        }

        this.htmlLoading = function (parent, animation = Loading) {

            var instance = this;
            instance.animation = animation;

            instance.show = function (text) {

                formclose();

                var modalId = 'modalloading';
                var modal = document.createElement('div');
                modal.id = modalId;
                modal.className = 'modal';
                modal.setAttribute('role', 'dialog');

                //Modal Content
                let modalcontent = document.createElement('div');
                modalcontent.className = 'modal-content-loading';
                modalcontent.style.maxWidth = '420px';

                //Header
                // let modalheader = document.createElement('div');
                // modalheader.className = 'modal-header';
                // modalcontent.appendChild(modalheader)
                //Header

                //Body
                let modalbody = document.createElement('div');
                modalbody.className = 'modal-body';

                let div = document.createElement('div');
                div.className = 'container-loading';

                let loading = document.createElement('div');
                loading.className = 'loading';
                let img = document.createElement('img');
                img.src = instance.animation;
                img.alt = 'loading';
                loading.appendChild(img);
                div.appendChild(loading);

                if (text) {
                    let ul = document.createElement('ul')
                    ul.className = 'one-col';
                    let label = document.createElement('label');
                    label.className = 'label-loading';
                    label.innerHTML = text;
                    ul.appendChild(label);
                    div.appendChild(ul);
                }
                modalbody.appendChild(div);

                modalcontent.appendChild(modalbody);

                // let modalfooter = document.createElement('div');
                // modalfooter.className = 'modal-footer';
                // modalcontent.appendChild(modalfooter);

                modal.appendChild(modalcontent);
                parent.appendChild(modal);

                modal.style.display = 'flex';

            }

            instance.close = function () {
                var timer1 = new Timer(1000, formclose);
                timer1.start();
            }

            function formclose() {
                var modal = document.getElementById('modalloading');
                if (modal) {
                    modal.parentNode.removeChild(modal);
                }
            }

        }

    }
}

export class Timer {
    constructor(time, tick) {
        //Components
        var c;
        var t = time;
        var timer_is_on = 0;

        var timerTick = () => tick();

        var timedCount = function () {
            c = setTimeout(timerTick, t);
        }

        this.start = function () {
            if (!timer_is_on) {
                timer_is_on = 1;
                timedCount();
            }
        }

        this.stop = function () {
            clearTimeout(c);
            timer_is_on = 0;
        }


    }
}

export class Waiter {
    constructor() {

        var me = this;
        me.flag = true;

        function __delay__(timer) {
            return new Promise(resolve => {
                timer = timer || 2000;
                setTimeout(function () {
                    resolve();
                }, timer);
            });
        };

        me.wait = async function () {
            while (me.flag) {
                await __delay__(1000);
            }
            return 0;
        }

        me.go = function () {
            me.flag = false;
        }

    }
}


