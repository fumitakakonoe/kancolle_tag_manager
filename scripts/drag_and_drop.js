'use strict';

const ID_DRAGGED = 'dragged';   // ドラッグ元に設定されるid属性の値。
const CLASS_DRAGGABLE = 'draggable';    // ドラッグ可能な要素に設定されるclass属性の値。
const CLASS_DROP_ZONE = 'dropzone'; // ドロップ可能な要素に設定されるclass属性の値。
const CLASS_DRAG_ELEMENT = 'dragelement';   // ドラッグが開始された時、ドラッグ元に設定されるclass属性の値。
const CLASS_DROP_OVER = 'dragover'; // ドロップ可能な要素にマウスが来た時に設定するclass属性の値。

// スタイルを変更する。
function changeStyle(event) {
    // console.log(event);
    if (event.target.nodeName.toLowerCase() === 'div') {
        if (event.target.classList.contains(CLASS_DROP_ZONE)) {
            event.target.classList.toggle(CLASS_DROP_OVER);
        }
    }
}

// 最初の HTML 文書の読み込みと解析が完了したとき、スタイルシート、画像、サブフレームの読み込みが完了するのを待たずに発生するイベントのリスナ。
window.addEventListener('DOMContentLoaded', () => {
    for (const element of document.getElementsByClassName(CLASS_DRAGGABLE)) {
        element.addEventListener('dragstart', (event) => {
            event.target.setAttribute('id', ID_DRAGGED);
            event.dataTransfer.setData('text/plain', ID_DRAGGED);
            event.target.classList.toggle(CLASS_DRAG_ELEMENT);
        });
    }
});

// document.addEventListener('drag', (event) => {
// }, false);

// ドラッグ操作が（マウスのボタンを離すか、エスケープキーを押すことで）終了したときに発生するイベントのリスナ。
// ドラッグ元のスタイルを変更する。
// eventにはドラッグ元の要素が格納されているので、それを利用してドラッグ元のスタイルを変更する。
document.addEventListener('dragend', (event) => {
    event.target.classList.toggle(CLASS_DRAG_ELEMENT);
}, false);

// 要素またはテキストの選択が有効なドロップターゲット上にドラッグされているときに発生するイベントのリスナ。
// 「ウェブページやアプリケーションのほとんどの領域は、ドロップデータを受け取る場所としては不適切です。従って、これらのイベントに対する既定の動作はドロップを禁止する働きをします。」
// そこで、preventDefault()を呼び出してドロップ可能な場所とする。
document.addEventListener('dragover', (event) => {
    // class属性にCLASS_DROP_ZONEを持ち、かつ、子要素を持たない場合はドロップ可能とする。
    if (event.target.classList.contains(CLASS_DROP_ZONE) && event.target.children.length === 0) {
        event.preventDefault();
    }
}, false);

// ドラッグされた要素またはテキスト選択が有効なドロップターゲットに入ったときに発生するイベントのリスナ。
document.addEventListener('dragenter', changeStyle, false);

// ドラッグされた要素またはテキスト選択が有効なドロップターゲットから離れるときに発生するイベントのリスナ。
document.addEventListener('dragleave', changeStyle, false);

// ドラッグされた要素またはテキスト選択が有効なドロップターゲットにドロップされたときに発生するイベントのリスナ。
document.addEventListener('drop', (event) => {
    event.preventDefault();
    changeStyle(event);
    const dragged = document.getElementById(event.dataTransfer.getData('text/plain'));
    dragged.removeAttribute('id');
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
}, false);
