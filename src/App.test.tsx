
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import PostInList from './components/PostInList';
import Post from "./components/Post"
import PostForm from "./components/PostForm"
import SocialPosts from "./components/SocialPosts"


// first test case
test('renders title and thought', () => {
  const post: Post = {title: "Test Title", thought: "Test Thought"};
  const spy = jest.fn();
  render(<PostInList title={post.title} thought={post.thought} onDelete={spy}/>);
  const title = screen.getByText("Test Title");
  const thought = screen.getByText("Test Thought")
  expect(title).toBeInTheDocument;
  expect(thought).toBeInTheDocument;
});

// second test case
test('renders title and thought', () => {
  const post: Post = {title: "ALL CAPS TITLE", thought: "ALL CAPS THOUGHT"};
  const spy = jest.fn();
  render(<PostInList title={post.title} thought={post.thought} onDelete={spy}/>);
  const title = screen.getByText("ALL CAPS TITLE");
  const thought = screen.getByText("ALL CAPS THOUGHT")
  expect(title).toBeInTheDocument;
  expect(thought).toBeInTheDocument;
});

// onDelete function works in post in list file
test('spy function is called when delete button is pressed', () => {
  const post: Post = {title: "Test Title", thought: "Test Thought"};
  const spy = jest.fn();
  render(<PostInList title={post.title} thought={post.thought} onDelete={spy}/>);
  const btn = screen.getByRole("button", {name: "onDelete"})
  fireEvent.click(btn)
  expect(spy).toHaveBeenCalled();
});

// Post Form submit button sends correct form "post"
test("onSubmit is called with correct Post object after submitting form", async () => {
 
  const spy = jest.fn();
  // would need multiple spy fn if there were other useStates etc.
  
  render(<PostForm onSubmit={spy}/>);
    // had to fireEvent first to be able to access the form and test it
  const show = screen.getByRole("button", {name: "showForm"});
  fireEvent.click(show);
  const form = screen.getByRole("form", {name: "form"});
  
  // checking if form is available now
  expect(form).toBeInTheDocument();

  // filling out the form
  const titleEl = screen.getByRole("textbox1", {name: "titleInput"});
  fireEvent.change(titleEl, {target: {value: "test title"}});
  const thoughtEl = screen.getByRole("textbox2", {name: "thoughtInput"});
  fireEvent.change(thoughtEl, {target: {value: "test thought"}});

  // setting up submit button
  fireEvent.click(await screen.getByRole("button", {name: "onSubmit"}))
  
  // fireEvent.submit(form);
  expect(spy).toBeCalledWith("test title", "test thought");
});

// Second test case 
test("onSubmit is called with correct Post object after submitting form", async () => {
 
  const spy = jest.fn();
  // would need multiple spy fn if there were other useStates etc.
  
  render(<PostForm onSubmit={spy}/>);
    // had to fireEvent first to be able to access the form and test it
  const show = screen.getByRole("button", {name: "showForm"});
  fireEvent.click(show);
  const form = screen.getByRole("form", {name: "form"});

  // checking if form is available now
  expect(form).toBeInTheDocument();

  // filling out the form
  const titleEl = screen.getByRole("textbox1", {name: "titleInput"});
  fireEvent.change(titleEl, {target: {value: "TeStTiTlE"}});
  const thoughtEl = screen.getByRole("textbox2", {name: "thoughtInput"});
  fireEvent.change(thoughtEl, {target: {value: "tEsTtHoUgHt"}});

  // setting up submit button
  fireEvent.click(await screen.getByRole("button", {name: "onSubmit"}))
  
  // fireEvent.submit(form);
  expect(spy).toBeCalledWith("TeStTiTlE", "tEsTtHoUgHt");
});

// check if close button calls onClose fn. 
// I used bootstrap for my modal/form so testing is different
test('calls onClose callback when close button is clicked', () => {
  const submitSpy = jest.fn();
  const closeSpy = jest.fn();

  render(<PostForm onSubmit={submitSpy}/>);
  const show = screen.getByRole("button", {name: "showForm"});
  fireEvent.click(show);
  const form = screen.getByRole("form", {name: "form"});

  // checking if form is available now
  expect(form).toBeInTheDocument();
  const btn = screen.getByRole("modal", {name: "modalForm"})
  fireEvent.click(btn)
  // when the form is not visible, it only have have class: 'modal-dialog'
  // bootstrap added class name to modal
  expect(btn).toHaveClass("modal-dialog");
});


