(() => {
  const sidebar = document.createElement("div");
  sidebar.style.position = "fixed";
  sidebar.style.height = "100vh";
  sidebar.style.width = "200px";
  sidebar.style.marginTop = "40px";
  sidebar.style.textAlign = "left";

  sidebar.innerHTML = /*html */ `
    <h3 style="margin-top:0;"><a href="/">Home</a></h3>
    <ul>
      <li><a href="/Channel.html">Channel1</a></li>
      <li><a href="/post-create.html">Create New Post</a></li>
      <li><a href="#">Coming soon</a></li>
    </ul>
  `;

  document.body.prepend(sidebar);
})();