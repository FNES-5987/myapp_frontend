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

// 채널 테이블용
function tableTemplate(item) {
  const template = /*html*/ `
  <tr data-no="${item.no}">
  <td>${item.no}</td>
  <td>${item.title}</td>
  <td>${item.creatorName}</td>
  <td>${new Date(item.createdTime).toLocaleString()}</td>
  </tr>
  `
}

(async () => {
  const url = "http://localhost:8080/posts";

  const response = await fetch(url);
  const result = await response.json();

  const data = Array.from(result);

  // 최신순 정렬
  // data
  //   .sort((a, b) => a.no - b.no)
  //   .forEach((item) => {
  //     document.forms[2].insertAdjacentHTML(
  //       "afterend", cardTemplate(item)
  //     );
  //   });
})();

// 뷰 페이지 추가
(() => {
  const form = document.querySelector("post-form");
  const post = document.getElementsByClassName("post-button");

  post[0].addEventListener("click", async (e) => {
    e.preventDefault();

    const title = document.getElementsByClassName("input-title");
    const content = document.getElementsByClassName("input-content");

    console.log(title[0].value);
    console.log(content[0].value);

    const titleVal = title[0].value;
    const contentVal = content[0].vlaue;

    const response = await fetch(
      "http://localhost:8080/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleVal,
          content: contentVal,
        }),
      }
    );

    const result = await response.json();
    console.log(result);
  });
})();