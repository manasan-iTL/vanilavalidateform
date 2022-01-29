/*
バリデーションチェック
*/

//要素取得
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("confirmpassword");
const errorMessageUsername = document.getElementById("error-username");

console.log(form,username,email,password,confirmpassword,errorMessageUsername);

/*
入力チェック
１各入力欄が空だったら「入力してくださいを表示」
２ユーザ名は3文字以上
３メールアドレスかどうかを判定　正規表現
４パスワードは6文字以上
５確認用パスワードが上のパスワードと一致しているか

見た目の変更
１エラーメッセージをsmallに出力
２入力欄を赤色に
*/

/* バリデーション */
/* 入力されていないとエラーを出す */
const checkInput = (input, errormessage) => {
   input.forEach(element => {
      if(element.value === "" ) {
         console.log("からです。");
         switchErrorSucces(element, errormessage, "form-group__input--error", "form-group__small--error", "form-group__input--succes", "form-group__input--succes");
      };
   });
};

/* 入力文字の長さをチェックする */
const checkLength = (input, length, errormessage, succesmessage) => {
   if((input.value !== "") && (input.value.length < length)) {
      switchErrorSucces(input, errormessage, "form-group__input--error", "form-group__small--error", "form-group__input--succes", "form-group__small--succes");
      console.log("文字数が足りません");
   } else if((input.value !== "") && (input.value.length >= length)) {
      switchErrorSucces(input, succesmessage, "form-group__input--succes", "form-group__small--succes",  "form-group__input--error", "form-group__small--error");
   }
}

/* メールアドレスのチェック */
const checkEmail = (input, errormessage, succesmessage) => {
   const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;
   if(!input.value.match(reg)) {
      console.log("正しくないメールアドレス");
      switchErrorSucces(input, errormessage, "form-group__input--error", "form-group__small--error", "form-group__input--succes", "form-group__small--succes");
   } else {
      switchErrorSucces(input, succesmessage, "form-group__input--succes", "form-group__small--succes",  "form-group__input--error", "form-group__small--error");
   };
};

/* パスワードの入力が一緒かどうか */
const checkConfirmPassword = (password, confirmpassword, length, errormessage, succesmessage) => {
   if(password.value !== confirmpassword.value) {
      console.log("パスワードが違います。");
      switchErrorSucces(confirmpassword, errormessage, "form-group__input--error", "form-group__small--error", "form-group__input--succes", "form-group__small--succes");
   } else if (password.value.length >= length){
      switchErrorSucces(confirmpassword, succesmessage, "form-group__input--succes", "form-group__small--succes",  "form-group__input--error", "form-group__small--error");
   }; 
};

/* エラー表示と成功表示の関数 */
const switchErrorSucces = (input, message, classnameInput, classnameSmall, removeClassnaemInput, removeClassnaemSmall) => {
   let ele = input.nextElementSibling;
   ele.innerText = message;
   ele.classList.remove(removeClassnaemInput, removeClassnaemSmall);
   input.classList.remove(removeClassnaemInput, removeClassnaemSmall);
   ele.classList.add(classnameSmall);
   input.classList.add(classnameInput)
};

// const deleteClassname = (input, classname) => {
//    let className = classname.split('--');
//    console.log(className[1]);
//    // input.classList().remove(classname);
// };



form.addEventListener("submit", (e)=> {
   e.preventDefault();
   console.log("Click");
   checkInput([username, email, password, confirmpassword], "入力してください");
   checkLength(username, 3, "ユーザ名は3文字以上です。", "正しい入力です。");
   checkEmail(email, "正しくないメールアドレスです。", "正しいメールアドレスです。");
   checkLength(password, 8, "パスワードは8文字以上です。", "正しい入力です。");
   checkConfirmPassword(password, confirmpassword, 8, "パスワードが違います。", "正しい入力です。");
})

