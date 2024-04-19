import React, {useState} from "react";
function SitesList(){
    const [posts, setPosts] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    const deletePost = async(id) => {
        try{
            //DELETE REQUEST to: http://localhost:3000/api/v1/posts/:id
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            if (response.ok){
                setPosts(post.filter((post) => post.id !== id));
            }
            else{
                throw response
            }
        } catch (e) {
            console.log(e);
        }
    }
    // Fetch posts from API
    useEffect(() => {
        async function loadPosts(){
            try{
                const response = await fetch(API_URL)
                if(response.ok){
                    const json = await response.json();
                    setPosts(json)
                }
                else{
                    throw response;
                }
            } catch (e){
                setError("Error occured");
                console.log("An error occured" + e);
            } finally {
                setLoading(false);
            }

        }
        loadPosts()
    }, [])
    return (<div>
        {posts.map((post) => (
            <div key={post.id} className="post-container">
                <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
                <div className={"post-links"}>
                    <button onClick={(() => deletePost(post.id))}>Delete</button>
                </div>
            </div>
        ))}
    </div>);
}

export default SitesList;