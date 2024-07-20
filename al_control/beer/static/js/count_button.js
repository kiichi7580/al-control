// (() => {
//   //HTMLのid値を使って以下のDOM要素を取得
//   const downbutton = document.getElementById('down');
//   const upbutton = document.getElementById('up');
//   const text = document.getElementById('textbox');
//   const reset = document.getElementById('reset');

//   //ボタンが押されたらカウント減
//   downbutton.addEventListener('click', (event) => {
//   //0以下にはならないようにする
//   if(text.value >= 1) {
//     text.value--;
//   }
//   });

//   //ボタンが押されたらカウント増
//   upbutton.addEventListener('click', (event) => {
//     text.value++;
//   })

//   //ボタンが押されたら0に戻る
//   reset.addEventListener('click', (event) => {
//     text.value = 0;
//   })

// })();


document.addEventListener('DOMContentLoaded', () => {
  const downButtons = document.querySelectorAll('.down');
  const upButtons = document.querySelectorAll('.up');
  const textboxes = document.querySelectorAll('.count');
  const resetButtons = document.querySelectorAll('.resetbtn');

  downButtons.forEach((downButton, index) => {
    downButton.addEventListener('click', () => {
      if (textboxes[index].value >= 1) {
        textboxes[index].value--;
      }
    });
  });

  upButtons.forEach((upButton, index) => {
    upButton.addEventListener('click', () => {
      textboxes[index].value++;
    });
  });

  resetButtons.forEach((resetButton, index) => {
    resetButton.addEventListener('click', () => {
      textboxes[index].value = 0;
    });
  });
});