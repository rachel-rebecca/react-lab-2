import PostForm from "./PostForm";
import PostInList from "./PostInList";
import {postsArray} from "./Post"
import {useState} from "react";
import "./SocialPosts.css"


function SocialPosts() {
    const [posts, setPosts] = useState(postsArray);
    
    
    function onSubmit(title: string, thought: string) {
        let posts2 = [...posts];
        posts2.unshift({title: title, thought: thought});
        setPosts(posts2)
    }

    function deletePost(index: number) {
        let posts2 = [...posts];
        posts2.splice(index, 1);
        setPosts(posts2);
    }
   
 
    return (
        <div>
            <h1>My Spooky Thoughts</h1> 
                
            <PostForm onSubmit={onSubmit}/>

       <main>
           {posts.map((item,index) => <span key={index}>
               <PostInList title={item.title} thought={item.thought} onDelete={() => {deletePost(index)}}/>
                </span>)}
       </main>

       </div>
       
       
    )
}

export default SocialPosts;