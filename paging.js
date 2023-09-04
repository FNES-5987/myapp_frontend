const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const tableBody = document.querySelector(".post-table tbody");
const pagingContainer = document.querySelector(".paging");
let currentPage = 0;

searchButton.addEventListener("click", searchAndDisplayResults);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchAndDisplayResults();
  }
});

async function searchAndDisplayResults() {
  const keyword = searchInput.value.trim();

  if (keyword === "") {
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/posts/search?keyword=${keyword}`);
    const searchResults = await response.json();

    renderSearchResults(searchResults);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function renderSearchResults(searchResults) {
  const data = searchResults.content;
  tableBody.innerHTML = ""; // 기존 데이터 초기화

  for (const [index, item] of data.entries()) {
    const commentResponse = await fetch(`http://localhost:8080/posts/${item.no}/commentcount`);
    const commentCount = await commentResponse.json();
    const tableRow = createTableRow(item, index, commentCount);
    tableBody.insertAdjacentHTML("beforeend", tableRow);
  }

  updatePagingLinks(searchResults.totalPages);
}



function updatePagingLinks(totalResults) {
  const totalPages = Math.ceil(totalResults / 10); // 한 페이지당 10개씩 보여주기로 가정
  pagingContainer.innerHTML = "";

  const prevButton = createPagingButton("이전", currentPage > 0, () => updateTable(currentPage - 1));
  pagingContainer.appendChild(prevButton);

  for (let i = 0; i < totalPages; i++) {
    const pageLink = createPagingButton(`${i + 1}`, true, () => updateTable(i));
    pagingContainer.appendChild(pageLink);
  }

  const nextButton = createPagingButton("다음", currentPage < totalPages - 1, () => updateTable(currentPage + 1));
  pagingContainer.appendChild(nextButton);
}

function createPagingButton(text, isEnabled, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.disabled = !isEnabled;
  button.addEventListener("click", onClick);
  return button;
}

function updateTable(page) {
  currentPage = page;
  searchAndDisplayResults();
}

// 초기 테이블 업데이트
updateTable(0);
