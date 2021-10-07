import React from "react";

export const TaskList = () => {
	const [task, setTask] = React.useState("");
	const [list, setList] = React.useState([]);

	React.useEffect(() => {
		//Aqui va el fetch
		fetch("https://assets.breatheco.de/apis/fake/todos/user/davidgoag")
			.then(data => {
				if (!data.ok) {
					return new Error(
						"There was a problem when loading the info"
					);
				} else {
					return data.json();
				}
			})
			.then(data => setList(data));
	}, []);

	React.useEffect(() => {}, [list]);

	const handleInput = e => {
		if (e.keyCode == 13) {
			if (e.target.value === "") {
				alert("Please enter a to do");
			} else {
				setTask(e.target.value);
				setList([
					...list,
					{
						label: task,
						done: false
					}
				]);
				setTask("");
			}
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/davidgoag",
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify([
						...list,
						{
							label: task,
							done: false
						}
					])
				}
			).then(resp => {
				if (resp.ok) {
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/davidgoag"
					)
						.then(data => {
							if (!data.ok) {
								return new Error(
									"There was a problem when loading the info"
								);
							} else {
								return data.json();
							}
						})
						.then(data => setList(data))
						.catch(err => console.log(err));
				}
			});
		}
	};
	const deleteToDo = indexToRemove => {
		let filterList = list.filter((taskToRemove, i) => i != indexToRemove);
		setList(filterList);
	};

	return (
		<div className="page">
			<div className="note">
				<div className="title">
					<input
						className="inputnote"
						type="text"
						placeholder="What needs to be done?"
						value={task}
						onChange={event => setTask(event.target.value)}
						onKeyDown={handleInput}
					/>
				</div>
				<div className="notesbody">
					<ul>
						{list.map((singleTask, i) => {
							return (
								<li key={i}>
									{singleTask.label}
									<span onClick={() => deleteToDo(i)}>
										<strong className="rojo"> x</strong>
									</span>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="notefooter">
					<p className="counter">Pending: {list.length}</p>
				</div>
			</div>
		</div>
	);
};
