const form = document.getElementById("signupForm")
const id = form.getElementsByName("newUsername")
const pw = form.getElementsByName("newPassword")
const btn = form.querySelector("button")

// 버튼에 클릭 이벤트 리스너를 추가합니다.
btn.addEventListener('click', function() {
    alert("회원가입이 완료되었습니다.")
    window.location.href = 'index.html';
  }
);
