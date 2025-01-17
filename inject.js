console.info('[BilibiliNoAt] Injected Successfully');

const checkComment = comment => {
    const commentText = comment.shadowRoot
      .querySelector('bili-comment-renderer').shadowRoot
      .querySelector('#body #main #content bili-rich-text').shadowRoot
      .querySelector('#contents');
    const textComponents = commentText.children;
    const len = textComponents.length;
    for(let i = 0; i < len; i++){
        if(textComponents[i].tagName == 'SPAN' && textComponents[i].innerHTML != ' '){
            return false;
        }
    }
    return true;
};

const deleteComments = comments => {
    const ticker = new MutationObserver(()=>{setTimeout(() => {
        const commentList = comments.querySelectorAll('bili-comment-thread-renderer');
        const len = commentList.length;
        let count = 0;
        for(let i = 0; i < len; i++){
            if(checkComment(commentList[i])){
                commentList[i].style.display = 'none';
                count++;
            }
        }
        console.info(`[BilibiliNoAt] Comments updated, removed ${count} meaningless comments.`)
    }, 100)});
    ticker.observe(comments, { childList: true, subtree: true });
    comments.appendChild(document.createElement('div'));
};

const trigger = new MutationObserver(() => {
    const commentWrapperHost = document.querySelector('bili-comments');
    if(!commentWrapperHost){
        return;
    }
    const commentWrapperRoot = commentWrapperHost.shadowRoot;
    comments = commentWrapperRoot.querySelector('#contents #feed');
    if(!comments){
        return;
    }
    trigger.disconnect();
    deleteComments(comments);
});

trigger.observe(document.body, { childList: true, subtree: true });