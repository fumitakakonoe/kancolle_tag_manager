'use strict';

// 最初の HTML 文書の読み込みと解析が完了したとき、スタイルシート、画像、サブフレームの読み込みが完了するのを待たずに発生するイベントのリスナ。
window.addEventListener('DOMContentLoaded', () => {
    const buttonImport = document.getElementById('import');
    buttonImport.addEventListener('click', (event) => {
        // テキストボックスから艦隊データを取得する。
        console.log('ボタンがクリックされた。');
    });
});
