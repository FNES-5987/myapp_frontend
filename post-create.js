// 포스트 페이지용
function cardTemplate(item) {
  const template = /*html*/ `
  <div data-no="${item.no}">
    <h3>${item.title}</h3>
    <div class = "post-info">
    <em>${item.creatorName}</em>
    <small>${new Date(
      item.createdTime
    ).toLocaleString()}</small>
    </div>
    <p>${item.content}</p>
    <hr>
    <button class="btn-remove">삭제</button>
  </div>
`;
  return template;
}

// 뷰 페이지 추가
(() => {
  const post = document.getElementsByClassName("post-button");

  post[0].addEventListener("click", async (e) => {
    e.preventDefault();

    const nickname = document.getElementsByClassName("input-nickname");
    const password = document.getElementsByClassName("input-password");
    const title = document.getElementsByClassName("input-title");
    const content = document.getElementsByClassName("input-content");

    const nicknameVal = nickname[0].value;
    const passwordVal = password[0].value;
    const titleVal = title[0].value;
    const contentVal = content[0].value;

    console.log(nicknameVal);
    console.log(passwordVal);
    console.log(titleVal);
    console.log(contentVal);
    
    const confirmVal = confirm("작성 하시겠습니까?");
    if(confirmVal) {
      const response = await fetch(
        "http://localhost:8080/posts",  
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname: nicknameVal,
            password: passwordVal,
            title: titleVal,
            content: contentVal,
          }),
        }
      );
  
      const result = await response.json();
      console.log(result);
      
      alert("작성 완료되었습니다!");
      window.location.href = "http://127.0.0.1:5500/Channel.html";

    } else return null;
  });
})();