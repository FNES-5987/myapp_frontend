let posts = [];

function addPost() {
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;

    if (title && content) {
        const post = { title, content, comments: [] };
        posts.push(post);
        updatePostList();
        clearInputs();
    }
}

function updatePostList() {
    const postList = document.getElementById("postList");
    postList.innerHTML = "";

    posts.forEach((post, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<b>${post.title}</b>: ${post.content}
                             <button onclick="editPost(${index})">수정</button>
                             <button onclick="deletePost(${index})">삭제</button>
                             <ul>${getCommentList(post)}</ul>
                             <input type="text" id="commentInput${index}" placeholder="댓글">
                             <button onclick="addComment(${index})">댓글 추가</button>`;
        postList.appendChild(listItem);
    });
}

function clearInputs() {
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";
}

function getCommentList(post) {
    return post.comments.map(comment => `<li>${comment} <button onclick="deleteComment(${posts.indexOf(post)}, '${comment}')">삭제</button></li>`).join("");
}

function addComment(postIndex) {
    const commentInput = document.getElementById(`commentInput${postIndex}`);
    const commentText = commentInput.value;

    if (commentText) {
        const post = posts[postIndex];
        post.comments.push(commentText);
        updatePostList();
        commentInput.value = "";
    }
}

function editPost(postIndex) {
    const post = posts[postIndex];
    const newTitle = prompt("새 제목", post.title);
    const newContent = prompt("새 내용", post.content);

    if (newTitle && newContent) {
        post.title = newTitle;
        post.content = newContent;
        updatePostList();
    }
}

function deletePost(postIndex) {
    posts.splice(postIndex, 1);
    updatePostList();
}

function deleteComment(postIndex, commentText) {
    const post = posts[postIndex];
    const commentIndex = post.comments.indexOf(commentText);

    if (commentIndex !== -1) {
        post.comments.splice(commentIndex, 1);
        updatePostList();
    }
}

updatePostList();
