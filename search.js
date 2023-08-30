function formatDate(date) {
  const today = new Date();
  const targetDate = new Date(date);

  if (
    targetDate.getFullYear() === today.getFullYear() &&
    targetDate.getMonth() === today.getMonth() &&
    targetDate.getDate() === today.getDate()
  ) {
    return targetDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } else {
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }
}

function tableTemplate(item, index, commentCount) {
  const formattedDate = formatDate(item.createdTime);

  let truncatedTitle = item.title;
  if (truncatedTitle.length > 20) {
    truncatedTitle = truncatedTitle.substring(0, 17) + '...';
  }

  const titleWithCommentCount = `${truncatedTitle} [${commentCount}]`;

  return /*html*/ `
    <tr data-no="${item.no}">
      <td>${index + 1}</td>
      <td>
        <a href="http://localhost:5500/post-view.html#${item.no}">${titleWithCommentCount}</a>
      </td>
      <td>${item.nickname}</td>
      <td>${formattedDate}</td>
    </tr>
  `;
}

async function updateTableAndCommentCounts() {
  const url = "http://localhost:8080/posts";
  const response = await fetch(url);
  const result = await response.json();
  const data = Array.from(result);

  const table = document.querySelector(".post-table");
  const tbody = table.querySelector("tbody");

  // 기존 데이터 초기화
  tbody.innerHTML = "";

  // 최신순 정렬
  data
    .sort((a, b) => a.no - b.no)
    .forEach(async (item, index) => {
      const commentResponse = await fetch(`http://localhost:8080/posts/${item.no}/commentcount`);
      const commentCount = await commentResponse.json();
      tbody.insertAdjacentHTML("beforeend", tableTemplate(item, index, commentCount));
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const table = document.querySelector(".post-table");
  const tbody = table.querySelector("tbody");
  const thead = table.querySelector("thead");

  // 검색 버튼 클릭 이벤트 처리
  searchButton.addEventListener("click", async () => {
    const keyword = searchInput.value.trim();
    if (keyword === "") {
      return;
    }

    // 검색 결과 가져오기
    const response = await fetch(`http://localhost:8080/posts/search?keyword=${keyword}`);
    const searchResults = await response.json();

    // 기존 데이터 초기화
    tbody.innerHTML = "";

    // 검색 결과만 테이블에 추가
    searchResults.forEach((item, index) => {
      const commentResponse = fetch(`http://localhost:8080/posts/${item.no}/commentcount`);
      commentResponse.then(async (response) => {
        const commentCount = await response.json();
        tbody.insertAdjacentHTML("beforeend", tableTemplate(item, index, commentCount));
      });
    });
  });

  // 초기 로딩 시, 테이블 헤더 추가
  thead.innerHTML = `
    <tr>
      <th>No</th>
      <th>제목</th>
      <th>작성자</th>
      <th>작성일</th>
    </tr>
  `;

  // 초기 로딩 시, 데이터 불러오기 및 테이블 채우기
  updateTableAndCommentCounts();
});
