(() => {
  const wrapper = document.querySelector(".wrapper"); // querySelector는 첫 번째 매칭 요소를 가져옵니다.

  const sidebar = document.createElement("div");
  sidebar.style.position = "sticky";
  sidebar.style.height = "fit-content";
  sidebar.style.width = "200px";
  sidebar.style.textAlign = "left";
  sidebar.style.gridArea = "aside";
  sidebar.style.border = "1px solid black";
  sidebar.className = "sidebar";
  sidebar.style.textAlign="center";

  sidebar.innerHTML = /*html */ `
    <h3 style="margin-top: 0;"><a href="/">Home</a></h3>
    <ul style="list-style-type: none; padding: 0;">
      <li>
        <a style="
          display: block;
          margin-bottom: 8px;
          padding: 9px 0 10px;
          font-size: 13px;
          line-height: 16px;
          text-align: center;
          color: #fff;
          background-color: #065093;
        " href="/post-create.html">Create New Post</a>
      </li>
      <li><a href="/Channel.html">Channel1</a></li>
    </ul>
  `;

  wrapper.prepend(sidebar);
})();
