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

function tableTemplate(item, index) {
  const formattedDate = formatDate(item.createdTime);

  let truncatedTitle = item.title;
  if (truncatedTitle.length > 20) {
    truncatedTitle = truncatedTitle.substring(0, 17) + '...';
  }

  return /*html*/ `
  <tr data-no="${item.no}">
  <td>${index + 1}</td>
  <td><a href="http://localhost:5500/post-view.html#${item.no}">${truncatedTitle}</a><div id = "comment-count"></div></td>
  <td>${item.nickname}</td>
  <td>${formattedDate}</td>
  </tr>
  `;  
}


(async()=>{
  const url = "http://localhost:8080/posts";

    const response = await fetch(url);
    const result = await response.json();
    const data = Array.from(result);

    const table = document.querySelector(".post-table");
    const tbody = table.querySelector("tbody");

      // 최신순 정렬
    data
      .sort((a, b) => a.no - b.no)
      .forEach((item, index) => {
        tbody.insertAdjacentHTML("afterend", tableTemplate(item, index));
      });
})();
