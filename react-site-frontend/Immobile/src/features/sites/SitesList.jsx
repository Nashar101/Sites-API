import React, {useState, useEffect} from "react";
import {API_URL} from "../../constants.js";
const SitesList  = ({ setCurrUser, setShow }) => {
    const [sites, setSites] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    const deletePost = async(id) => {
        try{
            const token = localStorage.getItem("token");
            //DELETE REQUEST to: http://localhost:3000/api/v1/sites/:id
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: token
                }
            });
            if (response.ok){
                setSites(sites.filter((site) => site.id !== id));
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
        async function loadSites(){
            try{
                const token = localStorage.getItem("token");
                const response = await fetch(`${API_URL}/get_sites`, {
                    method: 'get',
                    headers: {
                        "content-type": 'application/json',
                        Authorization: token,
                    },
                })
                if(response.ok){
                    const json = await response.json();
                    setSites(json)
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
        loadSites()
    }, [])
    return (<div>
        {sites.map((site) => (
            <div key={site.id} className="post-container">
                <h2>{site.url}</h2>
                <p>{site.duration}</p>
                <div className={"post-links"}>
                    <button onClick={(() => deletePost(site.id))}>Delete</button>
                </div>
            </div>
        ))}
    </div>);
}

export default SitesList