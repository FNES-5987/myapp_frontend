document.addEventListener("DOMContentLoaded", async () => {
  const postNo = window.location.hash.substr(1);

  // API 호출을 통해 해당 포스트의 데이터 가져오기
  const response = await fetch(`http://localhost:8080/post-view/${postNo}`);
  const postData = await response.json();

  const postBody = document.getElementById("post-body");

  // 포스트의 상세 내용 렌더링
  postBody.innerHTML = `
    <div class="post-info">
      <h3>${postData.title}</h3>
      <em>작성자 : ${postData.nickname}</em>
      <br>
      <small>${new Date(postData.createdTime).toLocaleString()}</small>
      <p>${postData.content}</p>
      <div id="edit-form" style="display: none;">
        <input type="text" id="edit-title" placeholder="제목">
        <textarea id="edit-content" placeholder="내용"></textarea>
        <button id="savebtn">저장</button>
      </div>
      <div class="content-btn">
        <button class="modify-btn">수정</button>
        <button class="delete-btn">삭제</button>
      </div>
    </div>
    <br>
  `;

  const btnarea = document.querySelector(".content-btn");
  const button = btnarea.querySelectorAll("button");
  
  const modbtn = button[0];
  const delbtn = button[1];

  const editForm = document.getElementById("edit-form");
  const editTitle = document.getElementById("edit-title");
  const editContent = document.getElementById("edit-content");
  const savebtn = document.getElementById("savebtn");

  modbtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const confirmVal = confirm("수정하시겠습니까?");
    if(confirmVal) {
      const promVal = prompt("작성시 입력한 비밀번호 입력");
      if(promVal == postData.password) {

        editForm.style.display = "block";
        editTitle.value = postData.title;
        editContent.value = postData.content;
      } else {
        alert("작성시 기입한 비밀번호를 입력하세요.")
        return null;
      }
    }
  })

  savebtn.addEventListener("click", async () => {
    const updatedTitle = editTitle.value;
    const updatedContent = editContent.value;

    const response = await fetch(
      `http://localhost:8080/posts/${postNo}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
          content: updatedContent,
        }),
      }
    );
    if (response.ok) {
      location.reload();
    } else {
      alert("포스트 수정에 실패했습니다.");
    }
  });

  delbtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const confirmVal = confirm("삭제하시겠습니까?");
    if(confirmVal) {
      const promVal = prompt("작성시 입력한 비밀번호 입력");
      if(promVal == postData.password) {
        const response = await fetch(
          `http://localhost:8080/posts/${postNo}`,
          {
            method: "DELETE",
          })
          alert("삭제되었습니다.");
          window.location.href = "http://127.0.0.1:5500/Channel.html";
      } else {
        alert("작성시 기입한 비밀번호를 입력하세요.")
        return null;
      }
    }
  })
});