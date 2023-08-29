(() => {
  const body = document.body;
  const sidebar = document.createElement("div");
  const wrapper = document.getElementsByClassName("wrapper")
  sidebar.style.position = "sticky";
  sidebar.style.height = "100vh";
  sidebar.style.width = "200px";
  sidebar.style.textAlign = "left";
  sidebar.style.gridArea = "aside";
  sidebar.style.border = "1px solid black";
  sidebar.className = "sidebar";

  sidebar.innerHTML = /*html */ `
    <h3 style="margin-top:0;"><a href="/">Home</a></h3>
    <ul style="list-style-type:none;">
      <li><a style=
      "display: block;
      margin-bottom: 8px;
      padding: 9px 0 10px;
      font-size: 13px;
      line-height: 16px;
      text-align: center;
      color: #fff;
      background-color: #065093;" href="/post-create.html">Create New Post</a></li>
      <li><a href="/Channel.html">Channel1</a></li>
    </ul>
  `;

  wrapper[0].prepend(sidebar);
  // document.body.prepend(sidebar);
})();