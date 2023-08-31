function formatDate(date) {
  const today = new Date();
  const targetDate = new Date(date);

  if (targetDate.toDateString() === today.toDateString()) {
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

function createTableRow(item, index, commentCount) {
  const formattedDate = formatDate(item.createdTime);

  const truncatedTitle = item.title.length > 20 ? item.title.substring(0, 17) + '...' : item.title;
  const titleWithCommentCount = `${truncatedTitle} [${commentCount}]`;

  return `
    <tr data-no="${item.no}">
      <td>${index + 1}</td>
      <td><a href="http://localhost:5500/post-view.html#${item.no}">${titleWithCommentCount}</a></td>
      <td>${item.nickname}</td>
      <td>${formattedDate}</td>
    </tr>`;
}

async function updateCommentCounts() {
  try {
    const response = await fetch("http://localhost:8080/posts");
    const data = await response.json();

    const table = document.querySelector(".post-table");
    const tbody = table.querySelector("tbody");

    for (const [index, item] of data.reverse().entries()) {
      const commentResponse = await fetch(`http://localhost:8080/posts/${item.no}/commentcount`);
      const commentCount = await commentResponse.json();
      const tableRow = createTableRow(item, data.length - index - 1, commentCount);
      tbody.insertAdjacentHTML("beforeend", tableRow);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
updateCommentCounts();