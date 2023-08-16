// 포스트 페이지용
function cardTemplate(item) {
  const template = /*html*/ `
  <div data-no="${item.no}">
    <em>${item.no}</em>
    <hr>
    <h3>${item.title}</h3>
    <p>${item.content}</p>
    <hr>
    <small>${new Date(
      item.createdTime
    ).toLocaleString()}</small>
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

  data
    .sort((a, b) => a.no - b.no)
    .forEach((item) => {
      document.forms[2].insertAdjacentHTML(
        "afterend", cardTemplate(item)
      );
    });
})();

// 추가
(() => {
  const form = document.forms[0];
  const post = form.querySelector("button");

  const title = form.querySelector("input");
  const content = form.querySelector("textarea");

  post.addEventListener("click", async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:8080/posts",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: title.value,
          content: content.value,
        }),
      }
    );
    console.log(response);

    const result = await response.json();
    console.log(result);

    document.forms[2].insertAdjacentHTML(
      "afterend",
      cardTemplate(result.data)
    );
  });
})();

// 삭제
(() => {
  document.body.addEventListener("click", (e) => { 
    if (
      e.target.classList.contains("btn-remove")
    ) {
      /** @type {HTMLButtonElement} */
      const removeBtn = e.target;
      removeBtn.parentElement.remove();
    }
  });
})();