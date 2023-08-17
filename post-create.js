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

  data
    .sort((a, b) => a.no - b.no)
    .forEach((item) => {
      document.forms[2].insertAdjacentHTML(
        "afterend", cardTemplate(item)
      );
    });
})();

// 뷰 페이지 추가
(() => {
  const form = document.form;
  const post = form.querySelector("button");
  const title = form.querySelector("textarea[0]");
  const content = form.querySelector("textarea[1]");

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

// 채널 테이블 추가
(async()=>{
  const table = document.querySelector("table")
  const tr = table.querySelector("tr")

  const response = await fetch(
    "http://localhost:8080/posts",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        creatorName: creatorName.value,
      }),
    }
  );
  console.log(response);

  const result = await response.json();
  console.log(result);
  document.table.insertAdjacentHTML(
    "afterend",
    tableTemplate(result.data)
  );
})()

// // 삭제
// (() => {
//   document.body.addEventListener("click", (e) => { 
//     if (
//       e.target.classList.contains("btn-remove")
//     ) {
//       /** @type {HTMLButtonElement} */
//       const removeBtn = e.target;
//       removeBtn.parentElement.remove();
//     }
//   });
// })();