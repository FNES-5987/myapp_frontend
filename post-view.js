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
        </div>
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
      
    `;

    const btnarea = document.querySelector(".content-btn");
    const button = btnarea.querySelectorAll("button");
    
    const modbtn = button[0];
    const delbtn = button[1];

    const editForm = document.getElementById("edit-form");
    const editTitle = document.getElementById("edit-title");
    const editContent = document.getElementById("edit-content");
    const savebtn = document.getElementById("savebtn");

    // 수정 버튼 클릭시 이벤트 처리
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

    // 수정 내용 저장 버튼 클릭시 이벤트 처리
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

    // 삭제 버튼 클릭시 이벤트 처리
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

    // 댓글 수 표시 엘리먼트
    const commentCountElement = document.getElementById("comment-count");

    // 댓글 수 가져오기 함수
    async function loadCommentCount() {
      const response = await fetch(
        `http://localhost:8080/posts/${postNo}/commentcount`
      );
      const commentCount = await response.json();

      commentCountElement.textContent = `댓글 수: ${commentCount}개`;
    }

    // 초기 댓글 수 표시
    loadCommentCount();

    // 댓글 입력 버튼 클릭 시 동작
    const commentButton = document.getElementById("comment-button");
    const commentInput = document.getElementById("comment-input");
    const commentsContainer = document.getElementById("comments");
    const nickname = document.getElementsByClassName("input-nickname");
    const password = document.getElementsByClassName("input-password");

    commentButton.addEventListener("click", async () => {
      const content = commentInput.value;
      let nicknameVal = nickname[0].value;
      const passwordVal = password[0].value;

      if (content.trim() === "") {
        alert("내용을 입력하세요.")
        return;
      }
    
      if (passwordVal.trim() === "") {
        alert("비밀번호를 입력하세요.");
        return;
      }
    
      // 닉네임이 입력되지 않았을 때 "익명"으로 설정
      if (nicknameVal.trim() === "") {
        nicknameVal = "익명";
      }

      const confirmVal = confirm("작성하시겠습니까? 작성 후 수정이 불가능합니다.");

      if (confirmVal) {

      const response = await fetch(
        `http://localhost:8080/posts/${postNo}/comments`, // 댓글 추가 API 주소
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname: nicknameVal,
            password: passwordVal,
            content: content,
          }),
        }
      );

      if (response.ok) {
        // 댓글 추가 후 댓글 수 갱신 및 화면 갱신
        loadCommentCount();
        loadComments();
        commentInput.value = "";
      }
    }
    });

    // 댓글 불러오기 함수
    async function loadComments() {
      const response = await fetch(
        `http://localhost:8080/posts/${postNo}/comments`
      );
      const comments = await response.json();
    
      commentsContainer.innerHTML = "";
      comments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.innerHTML = `
          <div class="comment-nickname"><span>${comment.nickname}</span></div>
          <div class="comment-content"><p>${comment.content}</p></div>
          <div class="comment-time"><span>${new Date(comment.createdTime).toLocaleString()}</span></div>
          <button class="delete-comment-btn" data-comment-id="${comment.id}">삭제</button>
        `;
    
        // 댓글 삭제 버튼 클릭 시 동작
        const deleteCommentButton = commentElement.querySelector(".delete-comment-btn");
        deleteCommentButton.addEventListener("click", async () => {
          const confirmVal = confirm("댓글을 삭제하시겠습니까?");
          if (confirmVal) {
            const passwordVal = prompt("댓글 작성 시 입력한 비밀번호 입력");
            if (passwordVal.trim() === "") {
              alert("비밀번호를 입력하세요.");
              return;
            }
        
            const commentId = deleteCommentButton.getAttribute("data-comment-id");
            const response = await fetch(
              `http://localhost:8080/posts/${postNo}/comments/${commentId}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  password: passwordVal,
                }),
              }
            );
        
            if (response.status === 200) {
              // 댓글 삭제 후 댓글 수 갱신 및 화면 갱신
              loadCommentCount();
              loadComments();
            } else {
              alert("댓글 삭제에 실패했습니다.");
            }
          }
        });
        
    
        commentsContainer.appendChild(commentElement);
      });
    }

    loadComments();
  });