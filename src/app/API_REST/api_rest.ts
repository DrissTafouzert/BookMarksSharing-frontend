const SERVER_ADDR='http://localhost:8080'

export const API_REST={
    auth:{
        login:SERVER_ADDR+'/api/auth/login',
        signup:SERVER_ADDR+'/api/auth/signup',
        logOut:SERVER_ADDR+'/api/auth/logout',
        refreshToken:SERVER_ADDR+'/api/auth/refreshToken'
    },
    post:{
        save:SERVER_ADDR+'/api/post',
        getAll:SERVER_ADDR+'/api/post',
        getById:SERVER_ADDR+'/api/post',
        getBySubredditId:SERVER_ADDR+'/api/post/by-subreddit',
        getByCurrentUser:SERVER_ADDR+'/api/post/by-current-user',
        search:SERVER_ADDR+'/api/post/search',
        getCommentsByPostId:SERVER_ADDR+'/api/comments/by-post'
    },
    subreddit:{
        save:SERVER_ADDR+'/api/subreddit',
        getById:SERVER_ADDR+'/api/subreddit',
        getAll:SERVER_ADDR+'/api/subreddit',
        getByName:SERVER_ADDR+'/api/subreddit/byName',
        join:SERVER_ADDR+'/api/subreddit/join'
    },
    vote:SERVER_ADDR+'/api/vote'

}