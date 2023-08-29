(()=>{
  const search = document.createElement("div");
  const another = document.querySelector(".another")

  search.innerHTML = /*html */ `
  <input type = "text" id = "search-input" placeholder = "제목 또는 내용 검색" />
  <button id = "search-button">검색</button>`;

  another.prepend(search);

  document.addEventListener("DOMContentLoaded", async () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const postList = document.querySelector(".post-list");
  
    // 검색 버튼 클릭 시 이벤트 처리
    searchButton.addEventListener("click", async () => {
      const keyword = searchInput.value.trim();
      if (keyword === "") {
        return;
      }
  
      const response = await fetch(`http://localhost:8080/posts/search?keyword=${keyword}`);
      const searchResults = await response.json();
  
      // 검색 결과를 화면에 표시
      renderPosts(searchResults);
    });
  
    // 포스트 목록 렌더링 함수
    function renderPosts(posts) {
      postList.innerHTML = ""; // 기존 내용 초기화
  
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.innerHTML = cardTemplate(post);
        postList.appendChild(postElement);
      });
    }
  });
})()