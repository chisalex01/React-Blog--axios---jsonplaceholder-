import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Edit = () => {
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const [blog, setBlog] = useState({ title: "", body: "", userId: "" });
  const { userId, title, body } = blog;
  const { id } = useParams();

  const onInputChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const loadBlog = async () => {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/" + id
    );
    setBlog(result.data);
  };

  useEffect(() => {
    loadBlog();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    axios
      .put("https://jsonplaceholder.typicode.com/posts/" + id, {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(blog),
      })
      .then((response) => {
        setIsPending(false);
        // history.go(-1);
        console.log(response.status);
        history.push("/");
      });
  };

  return (
    <div className="create">
      <h2>Edit current blog</h2>
      <form onSubmit={handleSubmit}>
        <label>New Title:</label>
        <input
          type="text"
          required
          value={title}
          placeholder=""
          onChange={(e) => onInputChange(e)}
        />
        <label>New content:</label>
        <textarea value={body} onChange={(e) => onInputChange(e)} required />
        <label>New Author:</label>
        <select value={userId} onChange={(e) => onInputChange(e)}>
          <option value="1">mario</option>
          <option value="2">yoshi</option>
          <option value="3">luigi</option>
          <option value="4">waluigi</option>
          <option value="5">princess peach</option>
          <option value="6">bowser</option>
          <option value="7">toad</option>
          <option value="8">wario</option>
          <option value="9">princess daisy</option>
          <option value="10">boo</option>
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
};

export default Edit;